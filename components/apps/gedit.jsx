import React, { Component } from 'react';
import ReactGA from 'react-ga4';
import emailjs from '@emailjs/browser';

export class Gedit extends Component {
    state = { sending: false, status: '', error: false };
    sending = false;

    sendMessage = async (event) => {
        event.preventDefault();
        if (this.sending) return;
        const form = event.currentTarget;
        const fields = new FormData(form);
        const name = String(fields.get('name') || '').trim();
        const email = String(fields.get('email') || '').trim();
        const subject = String(fields.get('subject') || '').trim();
        const message = String(fields.get('message') || '').trim();
        if (!name || !email || !subject || !message || !form.reportValidity()) {
            this.setState({ status: 'Please enter your name, email, subject, and message.', error: true });
            return;
        }

        this.sending = true;
        this.setState({ sending: true, status: '', error: false });
        try {
            // Public browser identifiers; the template fixes the recipient inbox.
            await emailjs.send('service_h0ee3dl', 'template_58dt1zc', {
                from_name: name,
                reply_to: email,
                subject,
                message,
                social_id: 'Not provided',
                site_url: 'https://portfolio-site-arch-linux-style.vercel.app/',
            }, 'U1nZSdwZnpvjua1Xu');
            form.reset();
            this.setState({ status: 'Message sent successfully. Thank you for reaching out!', error: false });
            ReactGA.event({ category: 'Contact', action: 'Message sent' });
        } catch {
            this.setState({ status: 'Message could not be sent. Your message is still here; please try again.', error: true });
        } finally {
            this.sending = false;
            this.setState({ sending: false });
        }
    };

    render() {
        const fieldClass = 'w-full text-ubt-gedit-orange focus:bg-ub-gedit-light outline-none text-sm pl-6 py-1 bg-transparent';
        return (
            <form onSubmit={this.sendMessage} className="w-full h-full relative flex flex-col bg-ub-cool-grey text-white select-none">
                <div className="flex items-center justify-between w-full bg-ub-gedit-light bg-opacity-60 border-b border-t border-blue-400 text-sm">
                    <span className="font-bold ml-2">Send a Message to Me</span>
                    <button type="submit" disabled={this.state.sending} className="border border-black bg-black bg-opacity-50 px-3 py-0.5 my-1 mx-1 rounded hover:bg-opacity-80 disabled:opacity-50">
                        {this.state.sending ? 'Sending…' : 'Send'}
                    </button>
                </div>
                <div className="relative flex-grow flex flex-col bg-ub-gedit-dark font-normal windowMainScreen">
                    <div className="absolute left-0 top-0 h-full px-2 bg-ub-gedit-darker"></div>
                    <div className="relative">
                        <input id="sender-name" name="name" aria-label="Your name" className={fieldClass} placeholder="Your name" autoComplete="name" maxLength={100} required />
                        <span className="absolute left-1 top-1/2 transform -translate-y-1/2 font-bold text-sm text-ubt-gedit-blue">1</span>
                    </div>
                    <div className="relative">
                        <input id="sender-email" name="email" aria-label="Your email" className={fieldClass} placeholder="Your email" autoComplete="email" type="email" maxLength={254} required />
                        <span className="absolute left-1 top-1/2 transform -translate-y-1/2 font-bold text-sm text-ubt-gedit-blue">2</span>
                    </div>
                    <div className="relative">
                        <input id="sender-subject" name="subject" aria-label="Subject" className={fieldClass + ' gedit-subject'} placeholder="Subject" maxLength={200} required />
                        <span className="absolute left-1 top-1/2 transform -translate-y-1/2 font-bold text-sm text-ubt-gedit-blue">3</span>
                    </div>
                    <div className="relative flex-grow">
                        <textarea id="sender-message" name="message" aria-label="Message" className={fieldClass + ' gedit-message resize-none h-full windowMainScreen'} placeholder="Message" maxLength={5000} required />
                        <span className="absolute left-1 top-1 font-bold text-sm text-ubt-gedit-blue">4</span>
                    </div>
                </div>
                {this.state.status && (
                    <p role={this.state.error ? 'alert' : 'status'} className="px-3 py-2 text-sm bg-black bg-opacity-50">
                        {this.state.status}
                    </p>
                )}
            </form>
        );
    }
}

export default Gedit;
export const displayGedit = () => <Gedit />;
