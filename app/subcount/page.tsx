"use client";
import React from "react";

const posts = [
  {
    id: 1,
    lines: [
      "Day X of posting my YouTube subscriber count until I hit 1,000 📈",
      "If you play Valorant, follow early 🤝",
      "What rank are you?",
    ],
  },
  {
    id: 2,
    lines: [
      "43 subscribers. No shortcuts, just consistency.",
      "Valorant grind starts here 🎮",
      "Comment your main agent ⬇️",
    ],
  },
  {
    id: 3,
    lines: [
      "Everyone starts at zero.",
      "Road to 100 subs 🚀",
      "If you’re seeing this, you’re early.",
    ],
  },
  {
    id: 4,
    lines: [
      "Posting my sub count until I hit Diamond + 1,000 subs 💎",
      "Plat lobbies are wild 😭",
      "Rank check in comments 👇",
    ],
  },
  {
    id: 5,
    lines: [
      "Small channel. Big goals.",
      "Daily Valorant streams 🎯",
      "Follow to watch the climb.",
    ],
  },
  {
    id: 6,
    lines: [
      "This number will change.",
      "Just watch 👀",
      "Who do you main in Valorant?",
    ],
  },
  {
    id: 7,
    lines: [
      "Day X — still showing up.",
      "Road to Diamond starts in Plat 🧗‍♂️",
      "Follow if you’re grinding ranked too.",
    ],
  },
  {
    id: 8,
    lines: [
      "Under 100 subs but not for long 📊",
      "Valorant content daily",
      "Comment your rank so I can follow back 🤝",
    ],
  },
  {
    id: 9,
    lines: [
      "Proof that every creator starts somewhere.",
      "Next stop: 100 subs 🚀",
      "If you love Valorant, you’re in the right place.",
    ],
  },
  {
    id: 10,
    lines: [
      "Saving this reel so I can come back when this hits 1,000 😤",
      "Road to Diamond | Valorant",
      "What rank are you right now?",
    ],
  },
];

const planCaptions = [
  {
    id: 1,
    lines: [
      "Day X of posting my YouTube subscriber count until I hit 1,000 📈",
      "What rank are you?",
      "Link in bio — live daily on YouTube 🎮",
    ],
  },
  {
    id: 2,
    lines: [
      "Small channel. Big goals.",
      "Road to Diamond 💎",
      "Link in bio — live daily on YouTube 🎮",
    ],
  },
  {
    id: 3,
    lines: [
      "Everyone starts somewhere.",
      "If you’re seeing this, you’re early 👀",
      "Link in bio — live daily on YouTube 🎮",
    ],
  },
  {
    id: 4,
    lines: [
      "Posting this so I can look back later.",
      "Road to 100 subs 🚀",
      "Link in bio — live daily on YouTube 🎮",
    ],
  },
  {
    id: 5,
    lines: [
      "Daily Valorant grind 🎮",
      "Plat → Diamond",
      "Link in bio — live daily on YouTube 🎮",
    ],
  },
  {
    id: 6,
    lines: [
      "This number will change.",
      "Just watch.",
      "Link in bio — live daily on YouTube 🎮",
    ],
  },
  {
    id: 7,
    lines: [
      "Under 100 subs but consistent.",
      "What agent do you main?",
      "Link in bio — live daily on YouTube 🎮",
    ],
  },
  {
    id: 8,
    lines: [
      "Road to Diamond starts in Plat 🧗",
      "Follow if you’re grinding ranked too.",
      "Link in bio — live daily on YouTube 🎮",
    ],
  },
  {
    id: 9,
    lines: [
      "Proof that consistency matters.",
      "Valorant daily.",
      "Link in bio — live daily on YouTube 🎮",
    ],
  },
  {
    id: 10,
    lines: [
      "Saving this reel for when it hits 1,000 😤",
      "What rank are you right now?",
      "Link in bio — live daily on YouTube 🎮",
    ],
  },
];

const hashtags = [
  "#valorant",
  "#smallstreamer",
  "#gamingreels",
  "#roadto1000",
  "#contentcreator",
  "#platvalorant",
  "#growthjourney",
];

const pinnedComment = "You’re early 👀 what rank are you?";
const ctaLine = "Link in bio — live daily on YouTube 🎮";

const dailyFormat = [
  "Reel length: 5–8 seconds",
  "Visual: subscriber count screenshot/screen recording",
  "OR 2–3 days/week: short clutch/funny clip",
  "On-screen text ideas:",
  "• Day X | Road to 1,000 Subs",
  "• 43 Subs | Plat → Diamond",
  "• Posting Until I Hit 1,000",
];

const commentReplyRule = [
  "Like every comment",
  "Reply with a question:",
  "• What agent do you main?",
  "• Solo queue or duo?",
  "• Trying to hit Diamond too?",
];

const weeklyMix = [
  "4–5 days/week: sub count screenshot/screen recording",
  "2–3 days/week: short clip (clutch, funny moment, ranked chaos)",
  "Same captions + hashtags apply",
];

const bestTimeToPost = [
  "After your stream",
  "Or between 6–9 PM local time",
  "Consistency > perfect timing",
];

export default function SubCountPostsPage() {
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    alert(`${label} copied!`);
  };

  const copyAll = () => {
    const combined = posts
      .map((post) => post.lines.join("\n"))
      .join("\n\n");
    navigator.clipboard.writeText(combined);
    alert("All posts copied!");
  };

  const copyPlanCaptions = () => {
    const combined = planCaptions
      .map((caption) => caption.lines.join("\n"))
      .join("\n\n");
    navigator.clipboard.writeText(combined);
    alert("All plan captions copied!");
  };

  const copyHashtags = () => {
    navigator.clipboard.writeText(hashtags.join("\n"));
    alert("Hashtags copied!");
  };

  const copyPinned = () => {
    navigator.clipboard.writeText(pinnedComment);
    alert("Pinned comment copied!");
  };

  const copyCta = () => {
    navigator.clipboard.writeText(ctaLine);
    alert("CTA copied!");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-red-500">
              Sub Count Posts
            </h1>
            <p className="text-gray-400 mt-2 text-sm sm:text-base">
              Quick copy captions for your subscriber count updates.
            </p>
          </div>
          <button
            onClick={copyAll}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-lg transition text-sm sm:text-base"
          >
            📋 Copy All
          </button>
        </div>

        <div className="grid gap-4 sm:gap-6">
          {posts.map((post) => {
            const text = post.lines.join("\n");
            return (
              <div
                key={post.id}
                className="bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-700 shadow-lg"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-white mb-2">
                      Post {post.id}
                    </h2>
                    <div className="text-gray-300 text-sm sm:text-base space-y-1">
                      {post.lines.map((line, index) => (
                        <p key={`${post.id}-${index}`}>{line}</p>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(text, `Post ${post.id}`)}
                    className="shrink-0 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-3 sm:px-4 rounded-lg transition text-xs sm:text-sm"
                  >
                    Copy
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 sm:mt-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-red-500">
                30-Day Instagram Reels Content Plan
              </h2>
              <p className="text-gray-400 mt-2 text-sm sm:text-base">
                Valorant • Small Creator • Sub Count Growth
              </p>
            </div>
            <button
              onClick={copyPlanCaptions}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-lg transition text-sm sm:text-base"
            >
              📋 Copy Plan Captions
            </button>
          </div>

          <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
            <div className="bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-700 shadow-lg">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Daily Format</h3>
              <ul className="text-gray-300 text-sm sm:text-base space-y-1">
                {dailyFormat.map((line, index) => (
                  <li key={`daily-${index}`}>{line}</li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-700 shadow-lg">
              <div className="flex items-center justify-between gap-3 mb-3">
                <h3 className="text-lg sm:text-xl font-bold text-white">Hashtags</h3>
                <button
                  onClick={copyHashtags}
                  className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-1.5 px-3 rounded-lg transition text-xs sm:text-sm"
                >
                  Copy
                </button>
              </div>
              <div className="text-gray-300 text-sm sm:text-base space-y-1">
                {hashtags.map((tag) => (
                  <p key={tag}>{tag}</p>
                ))}
              </div>
            </div>

            <div className="bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-700 shadow-lg">
              <div className="flex items-center justify-between gap-3 mb-3">
                <h3 className="text-lg sm:text-xl font-bold text-white">Pinned Comment</h3>
                <button
                  onClick={copyPinned}
                  className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-1.5 px-3 rounded-lg transition text-xs sm:text-sm"
                >
                  Copy
                </button>
              </div>
              <p className="text-gray-300 text-sm sm:text-base">{pinnedComment}</p>
            </div>

            <div className="bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-700 shadow-lg">
              <div className="flex items-center justify-between gap-3 mb-3">
                <h3 className="text-lg sm:text-xl font-bold text-white">CTA (Every Post)</h3>
                <button
                  onClick={copyCta}
                  className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-1.5 px-3 rounded-lg transition text-xs sm:text-sm"
                >
                  Copy
                </button>
              </div>
              <p className="text-gray-300 text-sm sm:text-base">{ctaLine}</p>
            </div>

            <div className="bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-700 shadow-lg">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Comment Reply Rule</h3>
              <ul className="text-gray-300 text-sm sm:text-base space-y-1">
                {commentReplyRule.map((line, index) => (
                  <li key={`reply-${index}`}>{line}</li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-700 shadow-lg">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Weekly Content Mix</h3>
              <ul className="text-gray-300 text-sm sm:text-base space-y-1">
                {weeklyMix.map((line, index) => (
                  <li key={`mix-${index}`}>{line}</li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-700 shadow-lg md:col-span-2">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Best Time To Post</h3>
              <ul className="text-gray-300 text-sm sm:text-base space-y-1">
                {bestTimeToPost.map((line, index) => (
                  <li key={`time-${index}`}>{line}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:gap-6">
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Captions (Rotate in order, then repeat)
            </h3>
            {planCaptions.map((caption) => {
              const text = caption.lines.join("\n");
              return (
                <div
                  key={`caption-${caption.id}`}
                  className="bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-700 shadow-lg"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-white mb-2">
                        Caption {caption.id}
                      </h4>
                      <div className="text-gray-300 text-sm sm:text-base space-y-1">
                        {caption.lines.map((line, index) => (
                          <p key={`caption-${caption.id}-${index}`}>{line}</p>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(text, `Caption ${caption.id}`)}
                      className="shrink-0 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-3 sm:px-4 rounded-lg transition text-xs sm:text-sm"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
