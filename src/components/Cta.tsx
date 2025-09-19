import React from "react";
import { mainData } from "../data/main";

const Cta: React.FC = () => {
  return (
    <section className="container max-w-6xl mt-10 md:mt-40">
      <div className="bg-white/10 px-5 xs:px-10 lg:px-20 xl:px-32 pt-14 md:pt-20 pb-14 md:pb-20 mb-10 md:mb-20">
        <h2>
          Contact
          <span>お問い合わせ・お申し込み</span>
        </h2>

        <p className="text-center mb-10 md:mb-16 !-mt-5">
          店舗やイベントの集客に、{mainData.keyWords}
          という選択肢。
          <br />
          動画制作だけでも、LEDディスプレイ導入、施工とのセットでもご対応可能です。
          <br />
          まずは無料相談からお気軽にお問い合わせください。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-3">
          <div className="group">
            <a
              className="flex flex-col bg-white border border-gray-200 rounded hover:bg-transparent transition-all group-hover:shadow-[0_0_5px_rgba(255,255,255,0.8)]"
              href={mainData.contact.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="p-4 md:p-5">
                <div className="flex justify-between gap-x-3">
                  <div className="grow">
                    <div className="flex justify-center items-center gap-x-3 md:gap-x-5">
                      <div className="relative w-12 h-12 md:w-14 md:h-14">
                        <img
                          src="/images/icons/mail-dark.svg"
                          alt="メールでお問合せ"
                          className="w-full h-full absolute transition-opacity duration-300 group-hover:opacity-0"
                        />
                        <img
                          src="/images/icons/mail-white.svg"
                          alt="メールでお問合せ"
                          className="w-full h-full absolute opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        />
                      </div>
                      <div className="grow [&_p]:text-black space-y-2">
                        <p className="group-hover:">メールでお問合せ</p>
                        <p className="text-lg xs:text-xl md:text-2xl font-semibold group-hover:text-yellow-400 transition-all">
                          お問合せフォーム
                        </p>
                        <p className="group-hover: !text-xs md:text-sm !leading-normal">
                          内容確認後、迅速にご返信いたします
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>

          <div className="group">
            <a
              className="flex flex-col bg-white border border-gray-200 rounded hover:bg-transparent transition-all group-hover:shadow-[0_0_5px_rgba(255,255,255,0.8)]"
              href={`tel:${mainData.contact.tel}`}
            >
              <div className="p-4 md:p-5">
                <div className="flex justify-between items-center gap-x-3">
                  <div className="grow">
                    <div className="flex justify-center items-center gap-x-3 md:gap-x-5">
                      <div className="relative w-12 h-12 md:w-14 md:h-14">
                        <img
                          src="/images/icons/phone-dark.svg"
                          alt="お電話でのお問い合わせ"
                          className="w-full h-full absolute transition-opacity duration-300 group-hover:opacity-0"
                        />
                        <img
                          src="/images/icons/phone-white.svg"
                          alt="お電話でのお問い合わせ"
                          className="w-full h-full absolute opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        />
                      </div>
                      <div className="grow [&_p]:text-black space-y-2">
                        <p className="group-hover:">お電話でお問い合わせ</p>
                        <p className="text-lg xs:text-xl md:text-2xl font-semibold group-hover:text-yellow-400 transition-all">
                          {mainData.contact.tel}
                        </p>
                        <p className="group-hover: text-xs md:text-sm !leading-normal">
                          受付時間：{mainData.contact.hours}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
