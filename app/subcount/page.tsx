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

const typographyReelIdeas = [
  {
    title: "Motivation & Success",
    items: [
      { id: 1, text: "Kisi ne kaha tha “tum nahi kar paoge”" },
      { id: 2, text: "Late ho, par galat nahi" },
      { id: 3, text: "Consistency > Motivation" },
      { id: 4, text: "Aaj ka struggle, kal ka story" },
      { id: 5, text: "Dream chhota ho sakta hai, effort nahi" },
      { id: 6, text: "Har din jeetna zaroori nahi" },
      { id: 7, text: "Jo ruk gaya, wo haar gaya" },
      { id: 8, text: "Comfort zone = Slow death" },
      { id: 9, text: "Mehnat dikhti nahi, result dikhta hai" },
      { id: 10, text: "Kismat bhi mehnat walon ka saath deti hai" },
      { id: 11, text: "Success noisy nahi hoti" },
      { id: 12, text: "Jab tak thako nahi, rukna mana hai" },
      { id: 13, text: "Fail hua hoon, khatam nahi" },
      { id: 14, text: "Silent grind, loud success" },
      { id: 15, text: "Aaj nahi to kal" },
      { id: 16, text: "Excuses bhi progress ki dushman hain" },
      { id: 17, text: "Hustle tab bhi jab koi dekh na raha ho" },
      { id: 18, text: "Middle class dreams hit different" },
      { id: 19, text: "Apna time aayega" },
      { id: 20, text: "Self made or nothing" },
      { id: 21, text: "Patience bhi ek skill hai" },
      { id: 22, text: "Mehnat kabhi dhokha nahi deti" },
      { id: 23, text: "Risk lene walon ka naam history me hota hai" },
      { id: 24, text: "Work until your name becomes brand" },
      { id: 25, text: "Discipline beats talent" },
      { id: 26, text: "Daily 1% better" },
      { id: 27, text: "Sapne free hote hain, sacrifice nahi" },
      { id: 28, text: "Grind abhi, shine baad me" },
      { id: 29, text: "Slow ho sakta hoon, stop nahi" },
      { id: 30, text: "Focus = Superpower" },
    ],
  },
  {
    title: "Love & Relationship",
    items: [
      { id: 31, text: "Sab kuch keh dena bhi zaroori nahi" },
      { id: 32, text: "Pyaar simple tha, log complicated ho gaye" },
      { id: 33, text: "Wo baat nahi rahi" },
      { id: 34, text: "Attachment hurts more than love" },
      { id: 35, text: "Loyal hona rare ho gaya hai" },
      { id: 36, text: "Dil saaf rakho, log nahi" },
      { id: 37, text: "Expectations hi dard deti hain" },
      { id: 38, text: "Sometimes silence is the answer" },
      { id: 39, text: "Pyaar kam, attention zyada" },
      { id: 40, text: "True love waits" },
      { id: 41, text: "Feelings ko mazak bana diya" },
      { id: 42, text: "Tum samjhe hi nahi" },
      { id: 43, text: "Love or habit?" },
      { id: 44, text: "Kuch log sirf lessons hote hain" },
      { id: 45, text: "Ishq mushkil nahi, log hain" },
      { id: 46, text: "Ghost hona naya normal hai" },
      { id: 47, text: "Dil tha, koi toy nahi" },
      { id: 48, text: "Time sab dikha deta hai" },
      { id: 49, text: "Attachment is dangerous" },
      { id: 50, text: "One sided stories hurt" },
      { id: 51, text: "Pyaar me ego nahi hoti" },
      { id: 52, text: "Loyalty is attractive" },
      { id: 53, text: "Trust once broken, never same" },
      { id: 54, text: "Dil bhola hota hai" },
      { id: 55, text: "Real love feels calm" },
      { id: 56, text: "Tum badal gaye" },
      { id: 57, text: "Sach bolna bhi risk hai" },
      { id: 58, text: "Love ≠ Control" },
      { id: 59, text: "Feelings matter" },
      { id: 60, text: "Jo apna ho, wahi kaafi hai" },
    ],
  },
  {
    title: "Sad & Breakup",
    items: [
      { id: 61, text: "Aadat thi, mohabbat nahi" },
      { id: 62, text: "Chhod ke jaane wale yaad aate hain" },
      { id: 63, text: "Dard bolta nahi" },
      { id: 64, text: "Dil bhar gaya tha" },
      { id: 65, text: "Ab fark nahi padta" },
      { id: 66, text: "Khamoshi bhi dard hoti hai" },
      { id: 67, text: "Apna sab de diya" },
      { id: 68, text: "Overthinking kills peace" },
      { id: 69, text: "Akele rehna seekh liya" },
      { id: 70, text: "Yaadein heavy hoti hain" },
      { id: 71, text: "Trust issues free me milte hain" },
      { id: 72, text: "Tum galat nahi, bas mere nahi" },
      { id: 73, text: "Dil thak gaya" },
      { id: 74, text: "Sab kuch keh ke bhi kuch nahi hua" },
      { id: 75, text: "Fake promises hurt" },
      { id: 76, text: "Healing is not linear" },
      { id: 77, text: "Dard bhi teacher hota hai" },
      { id: 78, text: "Aaj bhi yaad aata hai" },
      { id: 79, text: "Move on easy nahi hota" },
      { id: 80, text: "Apna bhi koi tha" },
      { id: 81, text: "Missing someone silently" },
      { id: 82, text: "Closure nahi mila" },
      { id: 83, text: "Ab kisi se umeed nahi" },
      { id: 84, text: "Feelings expire ho gayi" },
      { id: 85, text: "Dil toot ke chup ho gaya" },
      { id: 86, text: "Broken but breathing" },
      { id: 87, text: "Sadness hits at night" },
      { id: 88, text: "Love lost, lesson gained" },
      { id: 89, text: "Kuch khatam ho gaya" },
      { id: 90, text: "It is what it is" },
    ],
  },
  {
    title: "Attitude & Confidence",
    items: [
      { id: 91, text: "Main khud ka favourite hoon" },
      { id: 92, text: "Kam bolta hoon, zyada karta hoon" },
      { id: 93, text: "Silence scares people" },
      { id: 94, text: "Ego nahi, self-respect hai" },
      { id: 95, text: "I know my worth" },
      { id: 96, text: "Attitude free me nahi milta" },
      { id: 97, text: "Mehnat ka ghamand hai" },
      { id: 98, text: "Level sabke niklenge" },
      { id: 99, text: "Not available for drama" },
      { id: 100, text: "Apni race ka ghoda hoon" },
      { id: 101, text: "I don’t chase, I attract" },
      { id: 102, text: "Confidence loud nahi hota" },
      { id: 103, text: "Apna swag alag hai" },
      { id: 104, text: "Focused, not rude" },
      { id: 105, text: "Standards high hain" },
      { id: 106, text: "Main average nahi hoon" },
      { id: 107, text: "Energy match karo" },
      { id: 108, text: "Don’t test my patience" },
      { id: 109, text: "Built, not born" },
      { id: 110, text: "Self respect over everything" },
      { id: 111, text: "I choose peace" },
      { id: 112, text: "Underestimate mat kar" },
      { id: 113, text: "Calm but dangerous" },
      { id: 114, text: "Apna rule, apna game" },
      { id: 115, text: "Hustler mindset" },
      { id: 116, text: "I’m not for everyone" },
      { id: 117, text: "Class never goes out of style" },
      { id: 118, text: "Mindset matters" },
      { id: 119, text: "Silent killer vibes" },
      { id: 120, text: "Growth mode ON" },
    ],
  },
  {
    title: "Life & Reality",
    items: [
      { id: 121, text: "Life fair nahi hoti" },
      { id: 122, text: "Sab temporary hai" },
      { id: 123, text: "Log matlab ke hote hain" },
      { id: 124, text: "Reality hits hard" },
      { id: 125, text: "Paisa zaroori hai" },
      { id: 126, text: "Alone but peaceful" },
      { id: 127, text: "Time is expensive" },
      { id: 128, text: "Energy matters" },
      { id: 129, text: "Har koi apna nahi hota" },
      { id: 130, text: "Maturity hurts" },
      { id: 131, text: "Life simple rakho" },
      { id: 132, text: "Expectations kam rakho" },
      { id: 133, text: "Peace > People" },
      { id: 134, text: "Log badalte nahi, reveal hote hain" },
      { id: 135, text: "Trust slowly" },
      { id: 136, text: "Adulting is hard" },
      { id: 137, text: "Khud ke liye jiyo" },
      { id: 138, text: "Apna khayal rakho" },
      { id: 139, text: "Overthinking sab kharab karti hai" },
      { id: 140, text: "Sabke problems hote hain" },
      { id: 141, text: "Heal in silence" },
      { id: 142, text: "Choose wisely" },
      { id: 143, text: "Time teaches everything" },
      { id: 144, text: "Be kind but not stupid" },
      { id: 145, text: "Life isn’t Instagram" },
      { id: 146, text: "Reality > Fantasy" },
      { id: 147, text: "Learn to let go" },
      { id: 148, text: "Balance is everything" },
      { id: 149, text: "Khushi chhoti cheezon me hai" },
      { id: 150, text: "Life goes on" },
    ],
  },
  {
    title: "Money, Business & Hustle",
    items: [
      { id: 151, text: "Paisa bolta hai" },
      { id: 152, text: "Broke mindset hurts" },
      { id: 153, text: "Skills pay bills" },
      { id: 154, text: "Job se zyada socho" },
      { id: 155, text: "Income > Opinion" },
      { id: 156, text: "Build assets" },
      { id: 157, text: "Time is money" },
      { id: 158, text: "Paisa emotional nahi hota" },
      { id: 159, text: "Learn, earn, repeat" },
      { id: 160, text: "Side hustle matters" },
      { id: 161, text: "Rich mindset needed" },
      { id: 162, text: "Paisa option deta hai" },
      { id: 163, text: "Financial freedom first" },
      { id: 164, text: "Comfort kills dreams" },
      { id: 165, text: "Knowledge compounds" },
      { id: 166, text: "Risk is necessary" },
      { id: 167, text: "Build before flex" },
      { id: 168, text: "Money loves value" },
      { id: 169, text: "Cashflow matters" },
      { id: 170, text: "Focus on growth" },
      { id: 171, text: "Middle class pressure is real" },
      { id: 172, text: "Earn quietly" },
      { id: 173, text: "Success has price" },
      { id: 174, text: "Money doesn’t change, it reveals" },
      { id: 175, text: "Invest in yourself" },
      { id: 176, text: "Skills > Degree" },
      { id: 177, text: "Business teaches life" },
      { id: 178, text: "Freedom is expensive" },
      { id: 179, text: "Hustle with purpose" },
      { id: 180, text: "Money is tool" },
    ],
  },
  {
    title: "Short Viral One-Liners",
    items: [
      { id: 181, text: "Heal first" },
      { id: 182, text: "Choose peace" },
      { id: 183, text: "Still learning" },
      { id: 184, text: "Trust vibes" },
      { id: 185, text: "Energy check" },
      { id: 186, text: "No regrets" },
      { id: 187, text: "Less talk" },
      { id: 188, text: "Stay real" },
      { id: 189, text: "Keep going" },
      { id: 190, text: "Let it be" },
      { id: 191, text: "Built different" },
      { id: 192, text: "One day" },
      { id: 193, text: "Slow progress" },
      { id: 194, text: "Faith matters" },
      { id: 195, text: "Still standing" },
      { id: 196, text: "Quiet growth" },
      { id: 197, text: "Inner peace" },
      { id: 198, text: "Mindset shift" },
      { id: 199, text: "Level up" },
      { id: 200, text: "Stay focused" },
      { id: 201, text: "No shortcuts" },
      { id: 202, text: "Be patient" },
      { id: 203, text: "Self first" },
      { id: 204, text: "Keep faith" },
      { id: 205, text: "Calm mind" },
      { id: 206, text: "Stay strong" },
      { id: 207, text: "Healing mode" },
      { id: 208, text: "Progress loading" },
      { id: 209, text: "Peace only" },
      { id: 210, text: "Trust process" },
    ],
  },
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

  const copyAllTypographyIdeas = () => {
    const combined = typographyReelIdeas
      .map((category) =>
        category.items.map((item) => `${item.id}. ${item.text}`).join("\n")
      )
      .join("\n\n");
    navigator.clipboard.writeText(combined);
    alert("All typography ideas copied!");
  };

  const copyCategoryIdeas = (title: string, items: { id: number; text: string }[]) => {
    const combined = items.map((item) => `${item.id}. ${item.text}`).join("\n");
    navigator.clipboard.writeText(combined);
    alert(`${title} copied!`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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
        </div> */}

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

          <div className="mt-12 sm:mt-14">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-red-500">
                  210+ Typography Reel Ideas (All Niches)
                </h2>
                <p className="text-gray-400 mt-2 text-sm sm:text-base">
                  Perfect for Instagram typography reels — categorized by niche.
                </p>
              </div>
              <button
                onClick={copyAllTypographyIdeas}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-lg transition text-sm sm:text-base"
              >
                📋 Copy All Ideas
              </button>
            </div>

            <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
              {typographyReelIdeas.map((category) => (
                <div
                  key={category.title}
                  className="bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-700 shadow-lg"
                >
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      {category.title}
                    </h3>
                    <button
                      onClick={() => copyCategoryIdeas(category.title, category.items)}
                      className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-1.5 px-3 rounded-lg transition text-xs sm:text-sm"
                    >
                      Copy
                    </button>
                  </div>
                  <ul className="text-gray-300 text-sm sm:text-base space-y-1">
                    {category.items.map((item) => (
                      <li key={item.id} className="flex gap-2">
                        <span className="text-gray-500 w-8 shrink-0">{item.id}.</span>
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
