import { useRecentBooks, BookInfo } from "../hooks/useRecentBooks";

function BookCard({ book }: { book: BookInfo }) {
  return (
    <div className="flex flex-col items-center">
      {book.cover ? (
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-auto object-cover shadow-lg hover:shadow-xl transition-shadow"
          loading="lazy"
        />
      ) : (
        <div className="w-full aspect-[2/3] bg-gray-700 rounded flex items-center justify-center">
          <span className="text-gray-500 text-sm">画像なし</span>
        </div>
      )}
    </div>
  );
}

export function RecentBooks() {
  const { books, isLoading, error } = useRecentBooks();

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">書籍情報を読み込み中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-400">エラー: {error}</p>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">
          書籍情報が見つかりませんでした。
          <br />
          <span className="text-sm">
            ISBNコードが正しいか確認してください。
          </span>
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8">
      {books.map((book) => (
        <BookCard key={book.isbn} book={book} />
      ))}
    </div>
  );
}

