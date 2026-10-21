(function () {
    "use strict";

    var icn = document.getElementById("iconInput");
    var bgi = document.getElementById("badgeIcon");
    var icp = document.getElementById("iconPlaceholder");
    var exb = document.getElementById("exportButton");

    var nin = document.getElementById("nameInput");
    var din = document.getElementById("descriptionInput");
    var tin = document.getElementById("taskInput");

    var bnm = document.getElementById("badgeName");
    var bds = document.getElementById("badgeDescription");
    var bts = document.getElementById("badgeTask");
    var bty = document.getElementById("badgeType");

    var tbn = document.querySelectorAll(".type-button");
    var bdg = document.getElementById("badge");
    var bgs = document.getElementById("badgeStage");

    var fdd = document.getElementById("fontDropdown");
    var fdb = document.getElementById("fontDropdownButton");
    var fdl = document.getElementById("fontDropdownLabel");
    var fdm = document.getElementById("fontDropdownMenu");

    var tms = document.getElementById("template");
    var customGradientControls = document.getElementById("customGradientControls");
    var gradientName = document.getElementById("gradientName");
    var gradientStops = document.getElementById("gradientStops");
    var gradientStopCount = document.getElementById("gradientStopCount");
    var addGradientStop = document.getElementById("addGradientStop");
    var gradientAngle = document.getElementById("gradientAngle");
    var gradientAngleValue = document.getElementById("gradientAngleValue");
    var saveGradientPreset = document.getElementById("saveGradientPreset");
    var exportGradientPreset = document.getElementById("exportGradientPreset");
    var importGradientPreset = document.getElementById("importGradientPreset");
    var gradientStatus = document.getElementById("gradientStatus");

    var pts = Array.from(tms.options);
    var spt = tms.value;
    var gradientPresets = loadGradientPresets();

    var BADGE_DESIGN_WIDTH = 680;
    var BADGE_DESIGN_HEIGHT = 183;

    function ubs() {
        var avl = bgs.clientWidth;
        if (!avl) return;

        var scl = Math.min(1, avl / BADGE_DESIGN_WIDTH);

        bdg.style.transform = "scale(" + scl + ")";
        bgs.style.height = (BADGE_DESIGN_HEIGHT * scl) + "px";
    }

    window.addEventListener("resize", ubs);
    window.addEventListener("orientationchange", function () {
        setTimeout(ubs, 120);
    });

    if (typeof ResizeObserver !== "undefined") {
        new ResizeObserver(ubs).observe(bgs);
    }

    ubs();

    fdb.addEventListener("click", function (evt) {
        evt.stopPropagation();
        fdm.classList.toggle("open");
    });

    var fop = fdm.querySelectorAll(".font-option");

    fop.forEach(function (opt) {
        opt.addEventListener("click", function () {
            var selectedFont = opt.dataset.font;
            var label = opt.querySelector("span").textContent;

            bdg.style.setProperty("--badge-font", selectedFont);

            fdl.textContent = label;
            fdl.style.fontFamily = selectedFont;

            fdm.classList.remove("open");

            fbn();
            fbd();
            fbt();
        });
    });

    document.addEventListener("click", function (evt) {
        if (!fdd.contains(evt.target)) {
            fdm.classList.remove("open");
        }
    });

    var tpl = {

        general1: {
            borderFill: "#B49A80",
            nameFill: "#B49A80"
        },

        group: {
            borderFill: "linear-gradient(to bottom, #F4FCA7 0%, #E2C18B 50%, #84B4F5 100%)",
            nameFill: "linear-gradient(to bottom, #F4FCA7 0%, #E2C18B 50%, #84B4F5 100%)"
        },

        general2: {
            borderFill: "linear-gradient(to bottom, #F4FCA7 0%, #F9CC89 50%, #FE9567 100%)",
            nameFill: "linear-gradient(to bottom, #F4FCA7 0%, #F9CC89 50%, #FE9567 100%)"
        },

        archives: {
            borderFill: "linear-gradient(135deg, #82FF91 0%, #8DF3D0 32%, #82B7F4 58%, #8BFF9A 82%, #B4F58F 100%)",

            nameFill: "linear-gradient(135deg, #82B7F4 0%, #82B7F4 28%, #8BFF9A 28%, #8BFF9A 36%, #82B7F4 36%, #82B7F4 44%, #8BFF9A 44%, #8BFF9A 52%, #82B7F4 52%, #82B7F4 60%, #8BFF9A 60%, #8BFF9A 68%, #82B7F4 68%, #82B7F4 76%, #8BFF9A 76%, #8BFF9A 84%, #82B7F4 84%, #82B7F4 92%, #8BFF9A 92%, #8BFF9A 100%)"
        },

        stairwells: {
            borderFill: "linear-gradient(90deg, #66676B 0%, #55565A 30%, #414246 60%, #292A2E 100%)",

            nameFill: "linear-gradient(90deg, #707176 0%, #5C5D62 25%, #494A4F 50%, #37383D 75%, #27282C 100%)"
        },

        entity1: {
            borderFill: "linear-gradient(180deg, #CF8579 0%, #C97570 48%, #C76869 100%)",
            nameFill: "linear-gradient(180deg, #CF8579 0%, #C97570 48%, #C76869 100%)"
        },

        entity2: {
            borderFill: "linear-gradient(to bottom, #C594C5 0%, #E57B8A 50%, #F75F62 100%)",
            nameFill: "linear-gradient(to bottom, #C594C5 0%, #E57B8A 50%, #F75F62 100%)"
        },

        entity3: {
            borderFill: "linear-gradient(180deg, #F58FA6 0%, #EE72B7 42%, #C45BDD 78%, #A85BE8 100%)",
            nameFill: "linear-gradient(180deg, #F58FA6 0%, #EE72B7 42%, #C45BDD 78%, #A85BE8 100%)"
        },

        floor1: {
            borderFill: "linear-gradient(180deg, #E9FCFF 0%, #D9F6FF 35%, #B7E7FF 70%, #82C9F7 100%)",
            nameFill: "linear-gradient(180deg, #E8FCFF 0%, #CFEFFF 38%, #A8DBFF 72%, #7EC5F7 100%)"
        },

        floor2: {
            borderFill: "conic-gradient(from -31deg, #FFF06A 0%, #FFF06A 16%, #F8D58A 28%, #EFA7B5 40%, #D98FD1 47%, #82B9F5 54%, #82B9F5 62%, #C596E0 72%, #E9A5B5 84%, #F8D58A 94%, #FFF06A 100%)",
            nameFill: "linear-gradient(180deg, #FFF06A 0%, #F5D18A 32%, #E9A5B8 60%, #82B9F5 100%)"
        },

        crucifix1: {
            borderFill: "linear-gradient(180deg, #E7CBB5 0%, #D9F0FF 24%, #8CCEFF 50%, #D9F0FF 76%, #E7CBB5 100%)",
            nameFill: "linear-gradient(180deg, #E7CBB5 0%, #D9F0FF 24%, #8CCEFF 50%, #D9F0FF 76%, #E7CBB5 100%)"
        },

        crucifix2: {
            borderFill: "linear-gradient(180deg, #F1E4D5 0%, #DDF5FF 18%, #9DD9FF 36%, #82B9FF 50%, #C98FE0 67%, #E8A9B8 78%, #F0C77C 90%, #F0C77C 100%)",
            nameFill: "linear-gradient(180deg, #C8F7FF 0%, #A5DFFF 22%, #83B8F0 48%, #A99BEA 68%, #C58CE5 82%, #F09BC5 94%, #F0C36F 100%)"
        },

        challenge: {
            borderFill: "linear-gradient(90deg, #8ED8FF 0%, #8B7CFF 20%, #F05A6A 40%, #FFE56B 58%, #63E0C0 78%, #4C9CFF 100%)",
            nameFill: "linear-gradient(90deg, #8ED8FF 0%, #8B7CFF 20%, #F05A6A 40%, #FFE56B 58%, #63E0C0 78%, #4C9CFF 100%)"
        },

        "daily-run": {
            borderFill: "#20F044",
            nameFill: "#20F044"
        },

        battle: {
            borderFill: "linear-gradient(90deg, #B9ECFF 0%, #FFFFFF 50%, #5865D9 100%)",
            nameFill: "linear-gradient(90deg, #B9ECFF 0%, #FFFFFF 50%, #5865D9 100%)"
        },

        battle2: {
            borderFill: "linear-gradient(90deg, #FFFFFF 0%, #B9ECFF 25%, #FFE66D 50%, #F49BCB 75%, #5865D9 100%)",
            nameFill: "linear-gradient(90deg, #FFFFFF 0%, #B9ECFF 25%, #FFE66D 50%, #F49BCB 75%, #5865D9 100%)"
        }

    };

    var stp = {
        secretGeneral1: tpl.general1,
        secretGroup: tpl.group,
        secretGeneral2: tpl.general2,
        secretArchives: tpl.archives,
        secretStairwells: tpl.stairwells,
        secretEntity1: tpl.entity1,
        secretEntity2: tpl.entity2,
        secretEntity3: tpl.entity3,
        secretFloor1: tpl.floor1,
        secretFloor2: tpl.floor2,
        secretCrucifix1: tpl.crucifix1,
        secretCrucifix2: tpl.crucifix2,
        secretChallenge: tpl.challenge,
        secretDailyRun: tpl["daily-run"],
        secretBattle: tpl.battle,
        secretBattle2: tpl.battle2
    };

    var sto = [
        ["secretGeneral1", "SecretGeneral1"],
        ["secretGroup", "SecretGroup"],
        ["secretGeneral2", "SecretGeneral2"],
        ["secretArchives", "SecretArchives"],
        ["secretStairwells", "SecretStairwells"],
        ["secretEntity1", "SecretEntity1"],
        ["secretEntity2", "SecretEntity2"],
        ["secretEntity3", "SecretEntity3"],
        ["secretFloor1", "SecretFloor1"],
        ["secretFloor2", "SecretFloor2"],
        ["secretCrucifix1", "SecretCrucifix1"],
        ["secretCrucifix2", "SecretCrucifix2"],
        ["secretChallenge", "SecretChallenge"],
        ["secretDailyRun", "SecretDailyRun"],
        ["secretBattle", "SecretBattle"],
        ["secretBattle2", "SecretBattle2"],
        ["custom", "Custom gradient"]
    ];

    var ltp = stp;

    var lto = [
        ["secretGeneral1", "LegacyGeneral1"],
        ["secretGroup", "LegacyGroup"],
        ["secretGeneral2", "LegacyGeneral2"],
        ["secretArchives", "LegacyArchives"],
        ["secretStairwells", "LegacyStairwells"],
        ["secretEntity1", "LegacyEntity1"],
        ["secretEntity2", "LegacyEntity2"],
        ["secretEntity3", "LegacyEntity3"],
        ["secretFloor1", "LegacyFloor1"],
        ["secretFloor2", "LegacyFloor2"],
        ["secretCrucifix1", "LegacyCrucifix1"],
        ["secretCrucifix2", "LegacyCrucifix2"],
        ["secretChallenge", "LegacyChallenge"],
        ["secretDailyRun", "LegacyDailyRun"],
        ["secretBattle", "LegacyBattle"],
        ["secretBattle2", "LegacyBattle2"],
        ["custom", "Custom gradient"]
    ];

    function getGradientColors() {
        return Array.from(gradientStops.querySelectorAll("input[type='color']"))
            .map(function (input) { return input.value; });
    }

    function renderGradientStops(colors) {
        gradientStops.replaceChildren();
        colors.forEach(function (color, index) {
            var row = document.createElement("div");
            row.className = "gradient-stop";

            var label = document.createElement("label");
            label.className = "gradient-stop-label";
            label.textContent = "Color " + (index + 1);

            var picker = document.createElement("input");
            picker.type = "color";
            picker.value = color;
            picker.setAttribute("aria-label", "Gradient color " + (index + 1));
            picker.addEventListener("input", updateCustomGradient);
            label.appendChild(picker);
            row.appendChild(label);

            var remove = document.createElement("button");
            remove.type = "button";
            remove.className = "small-button";
            remove.textContent = "Remove";
            remove.disabled = colors.length <= 2;
            remove.setAttribute("aria-label", "Remove gradient color " + (index + 1));
            remove.addEventListener("click", function () {
                var next = getGradientColors();
                next.splice(index, 1);
                renderGradientStops(next);
                updateCustomGradient();
            });
            row.appendChild(remove);
            gradientStops.appendChild(row);
        });
        gradientStopCount.textContent = String(colors.length);
        addGradientStop.disabled = colors.length >= 32;
    }

    function normalizeGradient(data) {
        if (!data || typeof data.name !== "string" || !Array.isArray(data.colors)) return null;
        var name = data.name.trim().slice(0, 48);
        var angle = Number(data.angle);
        if (!name || !Number.isFinite(angle) || angle < 0 || angle > 360 ||
            data.colors.length < 2 || data.colors.length > 32 ||
            !data.colors.every(function (color) { return typeof color === "string" && /^#[0-9a-f]{6}$/i.test(color); })) {
            return null;
        }
        return { name: name, angle: Math.round(angle), colors: data.colors.map(function (color) { return color.toLowerCase(); }) };
    }

    function loadGradientPresets() {
        try {
            var saved = JSON.parse(localStorage.getItem("badgeCreator.gradientPresets.v1") || "[]");
            if (!Array.isArray(saved)) return [];
            return saved.map(function (item) {
                var data = normalizeGradient(item);
                return data && typeof item.id === "string"
                    ? Object.assign({ id: item.id }, data)
                    : null;
            }).filter(Boolean);
        } catch (error) {
            return [];
        }
    }

    function makePresetId() {
        return window.crypto && crypto.randomUUID
            ? crypto.randomUUID()
            : Date.now().toString(36) + Math.random().toString(36).slice(2);
    }

    function addPresetOptions() {
        gradientPresets.forEach(function (preset) {
            var option = document.createElement("option");
            option.value = "preset:" + preset.id;
            option.textContent = preset.name;
            tms.appendChild(option);
        });
    }

    function syncPresetOptions() {
        Array.from(tms.options).forEach(function (option) {
            if (option.value.indexOf("preset:") === 0) option.remove();
        });
        addPresetOptions();
    }

    function currentGradientData() {
        return normalizeGradient({
            name: gradientName.value,
            angle: gradientAngle.value,
            colors: getGradientColors()
        });
    }

    function fillGradientEditor(preset) {
        gradientName.value = preset.name;
        gradientAngle.value = String(preset.angle);
        renderGradientStops(preset.colors);
        updateCustomGradient();
    }

    function apt() {
        var stm;
        var isCustom = tms.value === "custom" || tms.value.indexOf("preset:") === 0;
        customGradientControls.hidden = !isCustom;
        if (isCustom) {
            var colors = getGradientColors();
            var gradient = "linear-gradient(" + gradientAngle.value + "deg, " +
                colors.map(function (color, index) {
                    return color + " " + Math.round(index / (colors.length - 1) * 100) + "%";
                }).join(", ") + ")";
            stm = { borderFill: gradient, nameFill: gradient };
        } else if (bdg.classList.contains("type-secret")) {
            stm = stp[tms.value];
        } else if (bdg.classList.contains("type-legacy")) {
            stm = ltp[tms.value];
        } else {
            stm = tpl[tms.value];
        }

        if (!stm) return;
        document.documentElement.style.setProperty("--template-border-fill", stm.borderFill);
        document.documentElement.style.setProperty("--template-name-fill", stm.nameFill);
    }

    function updateCustomGradient() {
        gradientAngleValue.textContent = gradientAngle.value + "°";
        gradientStopCount.textContent = String(getGradientColors().length);
        if (tms.value === "custom" || tms.value.indexOf("preset:") === 0) apt();
    }

    function persistGradientPresets() {
        localStorage.setItem("badgeCreator.gradientPresets.v1", JSON.stringify(gradientPresets));
    }

    function selectPreset(preset) {
        syncPresetOptions();
        tms.value = "preset:" + preset.id;
        spt = tms.value;
        fillGradientEditor(preset);
        apt();
    }

    renderGradientStops(["#8b5cf6", "#ec4899", "#f59e0b"]);
    addPresetOptions();
    gradientAngle.addEventListener("input", updateCustomGradient);
    addGradientStop.addEventListener("click", function () {
        var colors = getGradientColors();
        colors.push(colors[colors.length - 1] || "#ffffff");
        renderGradientStops(colors);
        updateCustomGradient();
    });

    saveGradientPreset.addEventListener("click", function () {
        var data = currentGradientData();
        if (!data) {
            gradientStatus.textContent = "Enter a name and use at least two colors.";
            return;
        }
        var existing = gradientPresets.find(function (preset) {
            return preset.name.toLowerCase() === data.name.toLowerCase();
        });
        var saved = Object.assign({ id: existing ? existing.id : makePresetId() }, data);
        if (existing) gradientPresets[gradientPresets.indexOf(existing)] = saved;
        else gradientPresets.push(saved);
        try {
            persistGradientPresets();
        } catch (error) {
            gradientStatus.textContent = "Could not save to this browser's local storage.";
            return;
        }
        selectPreset(saved);
        gradientStatus.textContent = "Preset saved on this device.";
    });

    exportGradientPreset.addEventListener("click", function () {
        var data = currentGradientData();
        if (!data) {
            gradientStatus.textContent = "Enter a name and use at least two colors before exporting.";
            return;
        }
        var fileData = { format: "badge-gradient", version: 1, name: data.name, angle: data.angle, colors: data.colors };
        var blob = new Blob([JSON.stringify(fileData, null, 2)], { type: "application/json" });
        var url = URL.createObjectURL(blob);
        var link = document.createElement("a");
        link.href = url;
        link.download = data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + ".gra";
        link.click();
        window.setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
        gradientStatus.textContent = "Downloaded " + link.download + ".";
    });

    importGradientPreset.addEventListener("change", async function () {
        var file = importGradientPreset.files[0];
        if (!file) return;
        try {
            var imported = JSON.parse(await file.text());
            var data = imported && imported.format === "badge-gradient" && imported.version === 1
                ? normalizeGradient(imported)
                : null;
            if (!data) throw new Error("Invalid gradient file.");
            var existing = gradientPresets.find(function (preset) {
                return preset.name.toLowerCase() === data.name.toLowerCase();
            });
            var preset = Object.assign({ id: existing ? existing.id : makePresetId() }, data);
            if (existing) gradientPresets[gradientPresets.indexOf(existing)] = preset;
            else gradientPresets.push(preset);
            persistGradientPresets();
            selectPreset(preset);
            gradientStatus.textContent = "Imported and saved on this device.";
        } catch (error) {
            gradientStatus.textContent = "Could not import that .gra file.";
        }
        importGradientPreset.value = "";
    });

    tms.addEventListener("change", function () {
        var preset = gradientPresets.find(function (item) {
            return tms.value === "preset:" + item.id;
        });
        if (preset) fillGradientEditor(preset);

        if (bdg.classList.contains("type-progress")) {
            spt = tms.value;
        }

        apt();
    });

    apt();

    icn.addEventListener("change", function () {

        var file = this.files[0];

        if (!file) return;

        var imageURL = URL.createObjectURL(file);

        bgi.src = imageURL;
        bgi.style.display = "block";

        icp.style.display = "none";
    });

    nin.addEventListener("input", function () {

        if (this.value.trim() === "") {
            bnm.textContent = "NAME OF BADGE";
        } else {
            bnm.textContent = this.value;
        }

        fbn();
    });

    function fbn() {
        var ttl = bnm;
        if (!ttl) return;

        var mxs = bdg.classList.contains("type-progress") ? 36 : 32;
        var mns = 14;

        var sze = mxs;

        ttl.style.fontSize = sze + "px";
        ttl.style.transform = "translateY(0)";

        while (
            ttl.scrollWidth > ttl.clientWidth &&
            sze > mns
        ) {
            sze--;
            ttl.style.fontSize = sze + "px";
        }

        var ofs = (mxs - sze) * 0.87;

        ttl.style.transform = "translateY(" + ofs + "px)";
    }

    function fbd() {
        var txt = bds;
        if (!txt) return;

        var isp = bdg.classList.contains("type-progress");
        var mxs = 32;
        var mns = 14;

        var sze = mxs;

        txt.style.whiteSpace = "nowrap";
        txt.style.fontSize = sze + "px";

        while (
            txt.scrollWidth > txt.clientWidth &&
            sze > mns
        ) {
            sze--;
            txt.style.fontSize = sze + "px";
        }

        if (sze === mns && txt.scrollWidth > txt.clientWidth) {
            txt.style.whiteSpace = "normal";
        }

        var ofs = (mxs - sze) * 0.1;

        if (isp) {
            txt.style.transform = "";
            txt.style.bottom = "";
            txt.style.top = "calc(50% + " + ofs + "px)";
        } else {
            txt.style.top = "";
            txt.style.bottom = "";
            txt.style.transform = "translateY(-" + ofs + "px)";
        }
    }

    function fbt() {
        var txt = bts;
        if (!txt) return;

        var isp = bdg.classList.contains("type-progress");
        var mxs = 32;
        var mns = 14;

        var sze = mxs;

        txt.style.whiteSpace = "nowrap";
        txt.style.fontSize = sze + "px";

        while (
            txt.scrollWidth > txt.clientWidth &&
            sze > mns
        ) {
            sze--;
            txt.style.fontSize = sze + "px";
        }

        if (sze === mns && txt.scrollWidth > txt.clientWidth) {
            txt.style.whiteSpace = "normal";
        }

        var ofs = (mxs - sze) * 0.3;

        if (isp) {
            txt.style.transform = "";
            txt.style.top = "";
            txt.style.bottom = "calc(2px + " + ofs + "px)";
        } else {
            txt.style.top = "";
            txt.style.bottom = "";
            txt.style.transform = "translateY(-" + ofs + "px)";
        }
    }

    din.addEventListener("input", function () {

        if (this.value.trim() === "") {
            bds.textContent = "Description";
        } else {
            bds.textContent = this.value;
        }

        fbd();
    });

    tin.addEventListener("input", function () {

        if (this.value.trim() === "") {
            bts.textContent = "Task";
        } else {
            bts.textContent = this.value;
        }

        fbt();
    });

    function stf(typ) {

        tms.innerHTML = "";

        if (typ === "SECRET") {

            sto.forEach(function (pr) {

                var opt = document.createElement("option");

                opt.value = pr[0];
                opt.textContent = pr[1];

                tms.appendChild(opt);
            });

            tms.value = "secretGeneral1";

        } else if (typ === "LEGACY") {

            lto.forEach(function (pr) {

                var opt = document.createElement("option");

                opt.value = pr[0];
                opt.textContent = pr[1];

                tms.appendChild(opt);
            });

            tms.value = "secretGeneral1";

        } else {

            pts.forEach(function (opt) {
                tms.appendChild(opt);
            });

            tms.value = spt;
        }

        addPresetOptions();
        if (typ === "PROGRESS" && spt.indexOf("preset:") === 0) {
            tms.value = spt;
        }
        apt();
    }

    tbn.forEach(function (btn) {

        btn.addEventListener("click", function () {

            tbn.forEach(function (b) {
                b.classList.remove("active");
            });

            this.classList.add("active");

            var typ = this.dataset.type;

            if (typ === "SECRET") {
                bty.textContent = "SECRET (Doesn't count towards progression)";
            } else if (typ === "LEGACY") {
                bty.textContent = "LEGACY (No progression, badge no longer in use)";
            } else {
                bty.textContent = typ;
            }

            bdg.classList.remove(
                "type-progress",
                "type-legacy",
                "type-secret"
            );

            bdg.classList.add("type-" + typ.toLowerCase());

            stf(typ);

            fbn();
            fbd();
            fbt();
        });

    });

    exb.addEventListener("click", function () {
        alert("WIP, u have to SS the badge rn");
    });

    fbn();
    fbd();
    fbt();
    ubs();

    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(function () {
            fbn();
            fbd();
            fbt();
            ubs();
        });
    }

})();
