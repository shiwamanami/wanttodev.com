import React from "react";

export const ColorPalette = () => {
  const colorVariants = [
    { name: "Primary 50", class: "bg-primary-50", text: "text-gray-900" },
    { name: "Primary 100", class: "bg-primary-100", text: "text-gray-900" },
    { name: "Primary 200", class: "bg-primary-200", text: "text-gray-900" },
    { name: "Primary 300", class: "bg-primary-300", text: "text-gray-900" },
    { name: "Primary 400", class: "bg-primary-400", text: "text-gray-900" },
    {
      name: "Primary 500 (メイン)",
      class: "bg-primary-500",
      text: "text-white",
    },
    { name: "Primary 600", class: "bg-primary-600", text: "text-white" },
    { name: "Primary 700", class: "bg-primary-700", text: "text-white" },
    { name: "Primary 800", class: "bg-primary-800", text: "text-white" },
    { name: "Primary 900", class: "bg-primary-900", text: "text-white" },
    { name: "Primary 950", class: "bg-primary-950", text: "text-white" },
  ];

  const accentColors = [
    { name: "Accent Pink", class: "bg-accent-pink", text: "text-white" },
    {
      name: "Accent Pink Light",
      class: "bg-accent-pink-light",
      text: "text-white",
    },
    {
      name: "Accent Pink Dark",
      class: "bg-accent-pink-dark",
      text: "text-white",
    },
    {
      name: "Accent Pink Soft",
      class: "bg-accent-pink-soft",
      text: "text-gray-900",
    },
  ];

  return (
    <div className="p-8 bg-gray-900 rounded-lg">
      <h3 className="text-2xl font-bold mb-6 text-center">カラーパレット</h3>

      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-primary-400">
          Primary Colors
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {colorVariants.map((color) => (
            <div key={color.name} className="text-center">
              <div
                className={`w-full h-16 rounded-lg ${color.class} flex items-center justify-center ${color.text} font-medium`}
              >
                {color.name.includes("メイン") ? "★" : ""}
              </div>
              <p className="text-sm text-gray-300 mt-2">{color.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-lg font-semibold mb-4 text-primary-400">
          Accent Colors
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {accentColors.map((color) => (
            <div key={color.name} className="text-center">
              <div
                className={`w-full h-16 rounded-lg ${color.class} flex items-center justify-center ${color.text} font-medium`}
              >
                A
              </div>
              <p className="text-sm text-gray-300 mt-2">{color.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-800 rounded-lg">
        <h4 className="text-lg font-semibold mb-3 text-primary-400">
          使用方法
        </h4>
        <div className="space-y-2 text-sm text-gray-300">
          <p>
            <code className="bg-gray-700 px-2 py-1 rounded text-primary-400">
              text-primary-500
            </code>{" "}
            - テキスト色
          </p>
          <p>
            <code className="bg-gray-700 px-2 py-1 rounded text-primary-400">
              bg-primary-500
            </code>{" "}
            - 背景色
          </p>
          <p>
            <code className="bg-gray-700 px-2 py-1 rounded text-primary-400">
              border-primary-500
            </code>{" "}
            - ボーダー色
          </p>
          <p>
            <code className="bg-gray-700 px-2 py-1 rounded text-primary-400">
              hover:bg-primary-600
            </code>{" "}
            - ホバー時の背景色
          </p>
          <p>
            <code className="bg-gray-700 px-2 py-1 rounded text-primary-400">
              var(--color-primary)
            </code>{" "}
            - CSS変数として使用
          </p>
        </div>
      </div>
    </div>
  );
};

export default ColorPalette;
