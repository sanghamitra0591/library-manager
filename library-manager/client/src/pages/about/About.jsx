import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="about-container">
            <header className="about-header">
                <h1>About Our Library</h1>
            </header>

            <main className="about-content">
                <section className="mission">
                    <h2>Our Mission</h2>
                    <p>
                        At our library, we aim to provide access to a wealth of knowledge, foster a love for reading, and create a community hub for learning and exploration.
                    </p>
                </section>

                <section className="history">
                    <h2>Our History</h2>
                    <p>
                        Established in 2000, our library has been serving the community for over 24. We have evolved over the years to include modern technologies and resources while preserving the love for traditional reading.
                    </p>
                </section>

                <section className="services">
                    <h2>What We Offer</h2>
                    <ul>
                        <li>📚 Extensive Collection of Books</li>
                        <li>💻 Access to Digital Resources</li>
                        <li>🖥️ Public Computers and Wi-Fi</li>
                        <li>🎉 Community Events and Workshops</li>
                        <li>👩‍🏫 Educational Programs for All Ages</li>
                    </ul>
                </section>

                <section className="community">
                    <h2>Community Involvement</h2>
                    <p>
                        We believe in the power of community. Our library collaborates with local schools, organizations, and volunteers to promote literacy and learning. We host regular events, including book fairs, reading competitions, and author meet-and-greets.
                    </p>
                </section>

                <section className="future-goals">
                    <h2>Our Future Goals</h2>
                    <p>
                        Looking ahead, we aim to expand our collection, enhance our digital resources, and provide more workshops and programs that cater to diverse interests. Our goal is to make our library a welcoming space for everyone.
                    </p>
                </section>

                <section className="contact">
                    <h2>Contact Us</h2>
                    <p>
                        We would love to hear from you! For inquiries, suggestions, or feedback, please reach out to us at:
                    </p>
                    <p>
                        <strong>Email:</strong>info@bookheaven.com<br />
                        <strong>Phone:</strong>(123) 456-7890<br />
                        <strong>Address:</strong> 123 Library Lane, Jaipur, India 302021
                    </p>
                </section>
            </main>

            <footer className="about-footer">
                <p>&copy; {new Date().getFullYear()} Library Management System</p>
            </footer>
        </div>
    );
};

export default About;
