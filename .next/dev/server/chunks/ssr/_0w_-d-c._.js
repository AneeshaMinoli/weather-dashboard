module.exports = [
"[project]/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

var e = new Error("Could not parse module '[project]/app/page.tsx', file not found");
e.code = 'MODULE_UNPARSABLE';
throw e;
}),
"[project]/components/DemoButton.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DemoButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$weatherPresets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/weatherPresets.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function DemoButton({ active, onSelect }) {
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const keys = Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$weatherPresets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["weatherPresets"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative z-10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setOpen((o)=>!o),
                className: "px-4 py-2 rounded-full border border-white/40 bg-white/15 backdrop-blur-md text-white text-sm",
                children: active ? `Demo: ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$weatherPresets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["weatherPresets"][active].label}` : "Demo mode"
            }, void 0, false, {
                fileName: "[project]/components/DemoButton.tsx",
                lineNumber: 12,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-[calc(100%+8px)] left-0 bg-black/85 backdrop-blur-xl border border-white/20 rounded-2xl p-2 grid grid-cols-2 gap-1.5 min-w-[220px]",
                children: keys.map((k)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            onSelect(k);
                            setOpen(false);
                        },
                        className: `px-2.5 py-2 rounded-lg text-left text-sm text-white ${active === k ? "bg-white/25" : "hover:bg-white/10"}`,
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$weatherPresets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["weatherPresets"][k].label
                    }, k, false, {
                        fileName: "[project]/components/DemoButton.tsx",
                        lineNumber: 22,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/DemoButton.tsx",
                lineNumber: 20,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/DemoButton.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/VideoBackground.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>VideoBackground
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function VideoBackground({ src, poster }) {
    const videoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [reduceMotion, setReduceMotion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReduceMotion(mq.matches);
        const handler = (e)=>setReduceMotion(e.matches);
        mq.addEventListener("change", handler);
        return ()=>mq.removeEventListener("change", handler);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        videoRef.current?.load();
    }, [
        src
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0 overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: poster,
                alt: "",
                className: `absolute inset-0 w-full h-full object-cover ${reduceMotion ? "z-[1]" : "z-0"}`
            }, void 0, false, {
                fileName: "[project]/components/VideoBackground.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            !reduceMotion && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                ref: videoRef,
                autoPlay: true,
                loop: true,
                muted: true,
                playsInline: true,
                poster: poster,
                className: "absolute inset-0 w-full h-full object-cover z-[1]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("source", {
                    src: src,
                    type: "video/mp4"
                }, void 0, false, {
                    fileName: "[project]/components/VideoBackground.tsx",
                    lineNumber: 26,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/VideoBackground.tsx",
                lineNumber: 25,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 z-[2] bg-gradient-to-b from-black/15 via-black/5 to-black/55"
            }, void 0, false, {
                fileName: "[project]/components/VideoBackground.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/VideoBackground.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
}),
"[project]/lib/weatherPresets.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "weatherPresets",
    ()=>weatherPresets
]);
const weatherPresets = {
    morning: {
        label: "Morning",
        temp: "22°",
        condition: "Clear morning",
        description: "Cool and calm, haze burning off by mid-morning.",
        humidity: "68%",
        precipitation: "5%",
        wind: "6 km/h",
        videoSrc: "/videos/morning.mp4",
        poster: "/videos/posters/morning.jpg"
    },
    day: {
        label: "Sunny",
        temp: "31°",
        condition: "Clear sky",
        description: "Bright and dry, good visibility across the hills.",
        humidity: "54%",
        precipitation: "5%",
        wind: "8 km/h",
        videoSrc: "/videos/day.mp4",
        poster: "/videos/posters/day.jpg"
    },
    cloudy: {
        label: "Cloudy",
        temp: "27°",
        condition: "Overcast",
        description: "Grey skies most of the day, no rain expected.",
        humidity: "70%",
        precipitation: "20%",
        wind: "10 km/h",
        videoSrc: "/videos/cloudy.mp4",
        poster: "/videos/posters/cloudy.jpg"
    },
    rainy: {
        label: "Rain",
        temp: "24°",
        condition: "Light rain",
        description: "Steady rain through the afternoon, bring an umbrella.",
        humidity: "88%",
        precipitation: "80%",
        wind: "14 km/h",
        videoSrc: "/videos/rainy.mp4",
        poster: "/videos/posters/rainy.jpg"
    },
    thunderstorm: {
        label: "Thunderstorm",
        temp: "23°",
        condition: "Thunderstorms",
        description: "Heavy rain with lightning, expect brief power flickers.",
        humidity: "92%",
        precipitation: "95%",
        wind: "32 km/h",
        videoSrc: "/videos/thunderstorm.mp4",
        poster: "/videos/posters/thunderstorm.jpg"
    },
    windy: {
        label: "Windy",
        temp: "26°",
        condition: "Breezy",
        description: "Strong gusts, secure loose outdoor items.",
        humidity: "60%",
        precipitation: "10%",
        wind: "38 km/h",
        videoSrc: "/videos/windy.mp4",
        poster: "/videos/posters/windy.jpg"
    },
    night: {
        label: "Night",
        temp: "20°",
        condition: "Clear night",
        description: "Cool and quiet, clear skies for stargazing.",
        humidity: "75%",
        precipitation: "5%",
        wind: "5 km/h",
        videoSrc: "/videos/night.mp4",
        poster: "/videos/posters/night.jpg"
    }
};
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime;
}),
];

//# sourceMappingURL=_0w_-d-c._.js.map