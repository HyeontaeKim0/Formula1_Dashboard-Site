import { MessageCircle, Trophy } from "lucide-react";
import { Eye, Heart } from "lucide-react";
export default function GridSection({}) {
  // 게시판 데이터
  const boardData = [
    {
      id: 1,
      title: "이번 노리스 우승은,,",
      tag: "노리스",
      like: 100,
      comment: 100,
    },
    {
      id: 2,
      title: "솔직히 막스가,,",
      tag: "베르스타펜",
      like: 100,
      comment: 100,
    },
    {
      id: 3,
      title: "이번 노리스 우승은,,",
      tag: "노리스",
      like: 100,
      comment: 100,
    },
    {
      id: 4,
      title: "이번 노리스 우승은,,",
      tag: "노리스",
      like: 100,
      comment: 100,
    },
    {
      id: 5,
      title: "이번 노리스 우승은,,",
      tag: "노리스",
      like: 100,
      comment: 100,
    },

    {
      id: 6,
      title: "이번 노리스 우승은,,",
      tag: "노리스",
      like: 100,
      comment: 100,
    },

    {
      id: 7,
      title: "이번 노리스 우승은,,",
      tag: "노리스",
      like: 100,
      comment: 100,
    },

    {
      id: 8,
      title: "이번 노리스 우승은,,",
      tag: "노리스",
      like: 100,
      comment: 100,
    },

    {
      id: 9,
      title: "이번 노리스 우승은,,",
      tag: "노리스",
      like: 100,
      comment: 100,
    },

    {
      id: 10,
      title: "이번 노리스 우승은,,",
      tag: "노리스",
      like: 100,
      comment: 100,
    },
    {
      id: 11,
      title: "이번 노리스 우승은,,",
      tag: "노리스",
      like: 100,
      comment: 100,
    },
    {
      id: 12,
      title: "이번 노리스 우승은,,",
      tag: "노리스",
      like: 100,
      comment: 100,
    },
    {
      id: 13,
      title: "이번 노리스 우승은,,",
      tag: "노리스",
      like: 100,
      comment: 100,
    },
  ];

  return (
    <>
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/20 backdrop-blur-sm">
          <MessageCircle className="text-primary" size={24} />
        </div>
        <div>
          <h3 className="text-xl font-extrabold tracking-tight text-gray-600">
            게시판
          </h3>
          <p className="mt-1 text-sm font-medium text-gray-400">
            F1 관련 정보를 공유하고 소통하세요
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 mt-10">
        {boardData.map((item) => (
          <div
            key={item.id}
            className="animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center gap-3">
                {/* <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm">
                  <MessageCircle className="text-primary" size={20} />
                </div> */}
                <div className="w-full">
                  <h4 className="text-lg font-bold text-gray-500">
                    {item.title}
                  </h4>
                  <div className="flex justify-between mt-1">
                    <div className="flex items-center">
                      <p className="mt-1 text-sm font-medium text-[green] bg-green-200 rounded-full px-2 py-1 w-fit">
                        #{item.tag}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 justify-end">
                    <p className="mt-1 text-sm font-medium flex items-center gap-1 text-gray-500">
                      <Eye size={16} /> {item.comment}
                    </p>
                    <p className="mt-1 text-sm font-medium flex items-center gap-1 text-gray-500">
                      <Heart size={16} /> {item.like}
                    </p>
                    <p className="mt-1 text-sm font-medium flex items-center gap-1 text-gray-500">
                      <MessageCircle size={16} /> {item.comment}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* 더 보기 */}
      </div>
      <div className="flex justify-center">
        <button className="bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-dark transition-all duration-300">
          더 보기
        </button>
      </div>
    </>
  );
}
