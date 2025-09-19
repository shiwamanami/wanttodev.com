import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8">
      <div className="max-w-4xl mx-auto px-4 md:px-6 bg-white rounded-lg shadow-lg p-4 md:p-8">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2 text-center border-b-4 border-blue-500 pb-4">プライバシーポリシー</h1>
        <p className="text-center text-gray-500 italic mb-6 md:mb-8">最終更新日: 2024年12月19日</p>
        
        <section className="mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 border-l-4 border-blue-500 pl-4">1. はじめに</h2>
          <p className="leading-relaxed text-gray-600 mb-4">
            wanttodev.com（以下「当サイト」）は、ユーザーの個人情報の保護を重要な責務と考え、
            以下のプライバシーポリシーに従って個人情報を適切に取り扱います。
          </p>
        </section>

        <section className="mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 border-l-4 border-blue-500 pl-4">2. 収集する情報</h2>
          <h3 className="text-xl font-semibold text-gray-700 mb-2 mt-4">2.1 自動的に収集される情報</h3>
          <ul className="ml-6 mb-4">
            <li className="leading-relaxed text-gray-600 mb-1">IPアドレス</li>
            <li className="leading-relaxed text-gray-600 mb-1">ブラウザの種類とバージョン</li>
            <li className="leading-relaxed text-gray-600 mb-1">アクセス日時</li>
            <li className="leading-relaxed text-gray-600 mb-1">参照元のページ</li>
            <li className="leading-relaxed text-gray-600 mb-1">使用しているデバイスの情報</li>
          </ul>
          
          <h3 className="text-xl font-semibold text-gray-700 mb-2 mt-4">2.2 ユーザーが提供する情報</h3>
          <ul className="ml-6 mb-4">
            <li className="leading-relaxed text-gray-600 mb-1">お問い合わせフォームに入力された情報</li>
            <li className="leading-relaxed text-gray-600 mb-1">アカウント作成時に提供される情報</li>
            <li className="leading-relaxed text-gray-600 mb-1">その他ユーザーが自発的に提供する情報</li>
          </ul>
        </section>

        <section className="mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 border-l-4 border-blue-500 pl-4">3. 情報の利用目的</h2>
          <p className="leading-relaxed text-gray-600 mb-4">収集した情報は以下の目的で利用します：</p>
          <ul className="ml-6 mb-4">
            <li className="leading-relaxed text-gray-600 mb-1">サービスの提供・運営</li>
            <li className="leading-relaxed text-gray-600 mb-1">ユーザーサポートの提供</li>
            <li className="leading-relaxed text-gray-600 mb-1">サイトの改善・最適化</li>
            <li className="leading-relaxed text-gray-600 mb-1">セキュリティの確保</li>
            <li className="leading-relaxed text-gray-600 mb-1">法的義務の履行</li>
          </ul>
        </section>

        <section className="mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 border-l-4 border-blue-500 pl-4">4. 情報の共有</h2>
          <p className="leading-relaxed text-gray-600 mb-4">
            当サイトは、以下の場合を除き、ユーザーの個人情報を第三者と共有することはありません：
          </p>
          <ul className="ml-6 mb-4">
            <li className="leading-relaxed text-gray-600 mb-1">ユーザーの同意がある場合</li>
            <li className="leading-relaxed text-gray-600 mb-1">法的な要請がある場合</li>
            <li className="leading-relaxed text-gray-600 mb-1">当サイトの権利や財産を保護する必要がある場合</li>
            <li className="leading-relaxed text-gray-600 mb-1">ユーザーや公衆の安全を保護する必要がある場合</li>
          </ul>
        </section>

        <section className="mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 border-l-4 border-blue-500 pl-4">5. クッキー（Cookie）の使用</h2>
          <p className="leading-relaxed text-gray-600 mb-4">
            当サイトでは、ユーザーエクスペリエンスの向上のため、クッキーを使用する場合があります。
            クッキーの使用を希望しない場合は、ブラウザの設定で無効にすることができます。
          </p>
        </section>

        <section className="mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 border-l-4 border-blue-500 pl-4">6. データの保存期間</h2>
          <p className="leading-relaxed text-gray-600 mb-4">
            収集した個人情報は、利用目的の達成に必要な期間のみ保存し、
            その後は適切に削除または匿名化します。
          </p>
        </section>

        <section className="mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 border-l-4 border-blue-500 pl-4">7. データの保護</h2>
          <p className="leading-relaxed text-gray-600 mb-4">
            当サイトは、個人情報の漏洩、滅失、毀損の防止のため、
            適切な技術的・組織的安全対策を講じます。
          </p>
        </section>

        <section className="mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 border-l-4 border-blue-500 pl-4">8. ユーザーの権利</h2>
          <p className="leading-relaxed text-gray-600 mb-4">
            ユーザーは、自己の個人情報について、開示、訂正、削除、利用停止等を求める権利があります。
            これらの権利を行使したい場合は、下記の連絡先までお問い合わせください。
          </p>
        </section>

        <section className="mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 border-l-4 border-blue-500 pl-4">9. プライバシーポリシーの変更</h2>
          <p className="leading-relaxed text-gray-600 mb-4">
            当サイトは、必要に応じて本プライバシーポリシーを変更する場合があります。
            変更後のプライバシーポリシーは、当サイトに掲載した時点で効力を生じるものとします。
          </p>
        </section>

        <section className="mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 border-l-4 border-blue-500 pl-4">10. お問い合わせ</h2>
          <p className="leading-relaxed text-gray-600 mb-4">
            本プライバシーポリシーに関するお問い合わせは、以下の連絡先までお願いします：
          </p>
          <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-green-500">
            <p className="mb-2 font-medium">メール: privacy@wanttodev.com</p>
            <p className="font-medium">住所: 東京都渋谷区（例）</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
