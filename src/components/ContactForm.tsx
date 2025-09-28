import React, { useState } from "react";
import { Button } from "./Button";

interface FormData {
  name: string;
  email: string;
  company?: string;
  message: string;
}

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    // Netlify Formsは自動的に処理されるため、preventDefaultは呼ばない
    setIsSubmitting(true);
    setSubmitStatus("idle");

    // フォーム送信後、少し待ってから状態を更新
    setTimeout(() => {
      setSubmitStatus("success");
      setFormData({ name: "", email: "", company: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="py-16">
      <div className="container max-w-3xl mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
        <h2>
              CONTACT
              <span>お問い合わせ</span>
            </h2>
          <p>ご質問やご相談がございましたら、お気軽にお問い合わせください。</p>
        </div>

        <div className="bg-transparent border border-white/40 p-8 md:p-16">
          {submitStatus === "success" && (
            <div className="mb-6 p-4 bg-green-900/50 border border-green-700 rounded-lg text-green-300">
              お問い合わせありがとうございます。内容を確認の上、2営業日以内にご返信いたします。
            </div>
          )}

          {submitStatus === "error" && (
            <div className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-300">
              送信に失敗しました。しばらく時間をおいて再度お試しください。
            </div>
          )}

          <form
            name="contact"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            action="/contact.html"
          >
            <div className="space-y-6 md:space-y-10 mb-6 md:mb-20">
            <input type="hidden" name="form-name" value="contact" />
            <div style={{ display: "none" }}>
              <label>
                Don't fill this out if you're human: <input name="bot-field" />
              </label>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm text-start mb-2"
                >
                  お名前 <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-500/60 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="山田太郎"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm text-start mb-2"
                >
                  メールアドレス <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-500/60 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="example@email.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="company"
                className="block text-sm text-start mb-2"
              >
                会社名・団体名
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-500/60 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="株式会社Sample"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm text-start mb-2"
              >
                お問い合わせ内容 <span className="text-red-400">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 bg-gray-500/60 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-vertical"
                placeholder="お問い合わせ内容をご記入ください"
              />
            </div>
            </div>

            <div className="text-center">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 text-lg"
              >
                {isSubmitting ? "送信中..." : "送信する"}
              </Button>
            </div>
          </form>

          {/* <div className="mt-8 text-center text-sm text-gray-400">
            <p>
              お急ぎの場合は、お電話でもお問い合わせいただけます。
              <br />
              <a
                href={`tel:${process.env.REACT_APP_PHONE || "080-3962-8870"}`}
                className="text-blue-400 hover:text-blue-300 underline"
              >
                080-3962-8870
              </a>
              （平日・土日祝日 10時〜18時）
            </p>
          </div> */}
        </div>
      </div>
    </section>
  );
};
