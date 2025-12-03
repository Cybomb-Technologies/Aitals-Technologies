// Newsletter.jsx
import React, { useState } from "react";
import { TrendingUp, Send, Check } from "lucide-react";
const API_BASE_URL1 = import.meta.env.VITE_API_BASE_URL;
const Newsletter = () => {
  // Newsletter states
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState("");
  const [subscribeError, setSubscribeError] = useState("");

  // Newsletter subscription
  const handleNewsletterSubscribe = async (e) => {
    e.preventDefault();

    if (!newsletterEmail) {
      setSubscribeError("Please enter your email address");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(newsletterEmail)) {
      setSubscribeError("Please enter a valid email address");
      return;
    }

    setIsSubscribing(true);
    setSubscribeError("");
    setSubscribeMessage("");

    try {
      const response = await fetch(`${API_BASE_URL1}/api/newsletter/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: newsletterEmail,
          source: "Home",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubscribeMessage(
          data.message || "Successfully subscribed to our newsletter!"
        );
        setNewsletterEmail("");
      } else {
        setSubscribeError(
          data.message || "Subscription failed. Please try again."
        );
      }
    } catch (err) {
      console.error("Newsletter subscription error:", err);
      setSubscribeError("Network error. Please try again.");
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-r from-gray-900 to-indigo-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl backdrop-blur-sm mb-6">
          <TrendingUp className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-4xl font-bold mb-4">Stay Ahead of the Curve</h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          Get exclusive access to our latest research, industry insights, and
          expert analysis. Join thousands of professionals who read our
          newsletter.
        </p>

        <form
          onSubmit={handleNewsletterSubscribe}
          className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
        >
          <input
            type="email"
            placeholder="Enter your work email"
            value={newsletterEmail}
            onChange={(e) => {
              setNewsletterEmail(e.target.value);
              setSubscribeError("");
              setSubscribeMessage("");
            }}
            className="flex-1 px-6 py-4 rounded-2xl border border-gray-600 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-indigo-500/30 backdrop-blur-sm"
            disabled={isSubscribing}
          />
          <button
            type="submit"
            disabled={isSubscribing}
            className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-2xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-indigo-500/25 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSubscribing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Subscribing...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Subscribe
              </>
            )}
          </button>
        </form>

        {/* Success/Error Messages */}
        {subscribeMessage && (
          <div className="mt-4 p-4 bg-green-500/20 border border-green-400 rounded-2xl text-green-300 flex items-center justify-center gap-2">
            <Check className="w-5 h-5" />
            {subscribeMessage}
          </div>
        )}

        {subscribeError && (
          <div className="mt-4 p-4 bg-red-500/20 border border-red-400 rounded-2xl text-red-300">
            {subscribeError}
          </div>
        )}

        <p className="text-sm text-gray-400 mt-4">
          No spam, unsubscribe at any time. Read our{" "}
          <a
            href="/privacy-policy"
            className="text-indigo-300 hover:text-white"
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </section>
  );
};

export default Newsletter;