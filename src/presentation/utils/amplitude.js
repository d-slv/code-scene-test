!(function () {
    "use strict";
    !(function (e, t) {
        var r = e.amplitude || { _q: [] };
        if (r.invoked) e.console && console.error && console.error("Amplitude snippet has been loaded.");
        else {
            r.invoked = !0;
            var n = t.createElement("script");
            (n.type = "text/javascript"),
                (n.integrity = "sha384-GS6YJWyepBi+TL3uXx5i7xx1UTA9iHaZr9q+5uNsuhzMb8c1SfkKW4Wee/IxZOW5"),
                (n.crossOrigin = "anonymous"),
                (n.async = !0),
                (n.src = "https://cdn.amplitude.com/libs/analytics-browser-1.0.0-min.js.gz"),
                (n.onload = function () {
                    e.amplitude.runQueuedFunctions || console.log("[Amplitude] Error: could not load SDK");
                });
            var s = t.getElementsByTagName("script")[0];
            function v(e, t) {
                e.prototype[t] = function () {
                    return this._q.push({ name: t, args: Array.prototype.slice.call(arguments, 0) }), this;
                };
            }
            s.parentNode.insertBefore(n, s);
            for (
                var o = function () {
                        return (this._q = []), this;
                    },
                    i = ["add", "append", "clearAll", "prepend", "set", "setOnce", "unset", "preInsert", "postInsert", "remove", "getUserProperties"],
                    a = 0;
                a < i.length;
                a++
            )
                v(o, i[a]);
            r.Identify = o;
            for (
                var u = function () {
                        return (this._q = []), this;
                    },
                    c = ["getEventProperties", "setProductId", "setQuantity", "setPrice", "setRevenue", "setRevenueType", "setEventProperties"],
                    l = 0;
                l < c.length;
                l++
            )
                v(u, c[l]);
            r.Revenue = u;
            var p = ["getDeviceId", "setDeviceId", "regenerateDeviceId", "getSessionId", "setSessionId", "getUserId", "setUserId", "setOptOut", "setTransport"],
                d = ["init", "add", "remove", "track", "logEvent", "identify", "groupIdentify", "setGroup", "revenue"];
            function f(e) {
                function t(t, r) {
                    e[t] = function () {
                        var n = {
                            promise: new Promise((r) => {
                                e._q.push({ name: t, args: Array.prototype.slice.call(arguments, 0), resolve: r });
                            }),
                        };
                        if (r) return n;
                    };
                }
                for (var r = 0; r < p.length; r++) t(p[r], !1);
                for (var n = 0; n < d.length; n++) t(d[n], !0);
            }
            f(r), (e.amplitude = r);
        }
    })(window, document);
})();

amplitude.init(process.env.AMPLITUDE_KEY);