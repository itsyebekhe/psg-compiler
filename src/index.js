/**
 * PSG Universal API Worker
 *
 * Dynamically fetches the structured data from the project's live index.html,
 * finds the requested subscription URL, and cross-compiles it to the desired format.
 *
 * @example
 * Request: /?path=Standard/Clash/Mix&output=singbox
 *
 * Parameters:
 * - path (required): The path to the subscription, e.g., "Standard/Clash/Mix".
 * - output (required): The desired output format: 'clash', 'singbox', or 'base64'.
 * - filename (optional): Sets the Content-Disposition filename for the download.
 * - limit (optional): Limits the number of nodes in the final output.
 */

// --- Lightweight JS-YAML bundle (for parsing Clash configs) ---
// This is a common pattern to include a dependency in a no-build Worker.
const jsyaml = (()=>{"use strict";var n={};function r(n,r){for(var t=0;t<r.length;t++){var e=r[t];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(n,e.key,e)}}function t(n,t,e){return t&&r(n.prototype,t),e&&r(n,e),n}var e=Object.prototype.toString,i=Object.prototype.hasOwnProperty,o=65279;function u(n){return n}function a(n,r){if(r)for(var t in r)i.call(r,t)&&(n[t]=r[t]);return n}function c(n,r){var t,e,i=[],o=[];if(!n)return[];if(Object.keys)e=Object.keys(n);else for(t in n)i.call(n,t)&&e.push(t);for(var u=0,a=e.length;u<a;u+=1)t=e[u],r>0&&-1!==f(o,t)||(o.push(t),i.push(n[t]));return i}var f=Array.prototype.indexOf||function(n){for(var r=0,t=this.length;r<t;r+=1)if(this[r]===n)return r;return-1};function l(n){return"[object Function]"===e.call(n)}function s(n){return"[object RegExp]"===e.call(n)}function p(n,r){return n.filter((function(n){return!r.test(n)}))}var h=Array.isArray||function(n){return"[object Array]"===e.call(n)};function g(n){return n instanceof Date}function m(n){return null===n||void 0===n}function v(n){return"object"==typeof n&&null!==n}function y(n){return 0===n.length}var d=["y","Y","yes","Yes","YES","on","On","ON","true","True","TRUE"],b=["n","N","no","No","NO","off","Off","OFF","false","False","FALSE"],S=["null","Null","NULL","~",null],w=/^\s*[-+]?(0b[0-1_]+|0o[0-7_]+|0x[0-9a-fA-F_]+|[0-9_]+(\.[0-9_]*)?([eE][-+]?[0-9_]+)?)\s*$/,A=/[-+]/,x=/^\.inf/i,k=/^\.nan/i,C=/^0o([0-7_]+)$/,F=/^0x([0-9a-fA-F_]+)$/,I=/^0b([0-1_]+)$/,O=/^(\d{4})-(\d\d?)-(\d\d?)(?:(?:[ \t]+)(\d\d?):(\d\d?):(\d\d?)(?:\.(\d+))?)?(?:[ \t]*(Z|([-+])(\d\d?)(?::(\d\d?))?))?$/,E=/^([0-9_]+):([0-9_]+):([0-9_]+)(\.[0-9_]+)?$/,T=" \t\r\n";function _(n){return n.replace(/_/g,"")}function L(n,r,t){var e,i,o=0,u=null,a=0,c=0;if(n=_(n),A.test(n[0])&&(i="-"===n[0],n=n.slice(1)),x.test(n))return i?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY;if(k.test(n))return NaN;if(C.test(n))return(i?-1:1)*parseInt(n.slice(2),8);if(F.test(n))return(i?-1:1)*parseInt(n.slice(2),16);if(I.test(n))return(i?-1:1)*parseInt(n.slice(2),2);for(var f=0,l=n.length;f<l;f++)if(e=n[f],"."===e)o>0&&r(),o++;else if("e"===e||"E"===e)u>0&&r(),u=1;else{if(!("+"===e||"-"===e)){if(a>0||c>0)t();else if(o>0)c=1;else a=1;continue}u>0&&(null===u||1!==u)&&t(),u=2}return parseFloat(n)}function P(n,r,t){var i=O.exec(n);if(null===i)return L(n,r,t);var o,u=1,a=new Array(7);for(o=1;o<4;o++)a[o]=parseInt(i[o],10);if(i[4]){for(o=4;o<7;o++)a[o]=parseInt(i[o]||0,10);a[7]=i[7]?i[7].slice(0,3):0}if(i[8]){u="-"===i[9]?-1:1;var c=parseInt(i[10],10),f=parseInt(i[11]||0,10);a[0]=u*(60*c+f)}return new Date(Date.UTC(a[1],a[2]-1,a[3],a[4],a[5],a[6],a[7])+6e4*a[0])}function j(n,r,t){var i=E.exec(n);if(null===i)return P(n,r,t);var o,u=1,a=new Array(4);for(o=1;o<4;o++)a[o]=parseInt(i[o],10);return i[4]&&(a[4]=parseInt(i[4].slice(1),10)),u*(3600*a[1]+60*a[2]+a[3]+a[4]/1e3)}function M(n){return new RegExp("^(?:"+n.map(u).join("|")+")$","i")}function R(n){return v(n)&&h(n.errors)&&y(n.errors)}function q(n,r,t,e,i){t=t||null,e=e||{},i=i||n;for(var o in n)i.call(r,n[o],o,t)&&(e[o]=n[o]);return e}function B(n,r){return new n("tag:yaml.org,2002:"+r)}var U=new(t((function(n,r){a(this,{name:n,kind:r,instanceOf:null,predicate:null,represent:null,defaultStyle:null,styleAliases:null}),this.name=n,this.kind=r,this.instanceOf=null,this.predicate=null,this.represent=null,this.defaultStyle=null,this.styleAliases={},this.styleAliases=function(n,r){var t={};if(null!==n)for(var e in n)i.call(n,e)&&(t[n[e]]=e);return r?a(t,r):t}(r.styleAliases,{}),this.defaultStyle=r.defaultStyle||null})))("?",{defaultStyle:"plain",represent:function(n){if(null===n)return"~";if("object"==typeof n&&0===n.length)return h(n)?"[]":"{}";if("string"==typeof n){var r,t="",e=n.length,i=0;if(function(n){for(var r=0,t=n.length;r<t;r+=1)if(-1==="\n\r".indexOf(n.charAt(r)))return!1;return!0}(n))t='|';else if(function(n){for(var r=0,t=n.length;r<t;r+=1)if("\n\r".indexOf(n.charAt(r))>=0)return!0;return!1}(n))t='>';else for(;-1!==T.indexOf(n.charAt(i))&&i<e-1;)i++;for(i=0;i<e;i++)r=n.charAt(i),T.indexOf(r)>=0||":"!==r&&"#"!==r||(t="");return""===t&&"string"==typeof n&&n.length&&(t='"'),t}return null}});return n.exports={determineEncoder:function(n){if(m(n))return U;var r=q(this.implicitTypes,(function(r){return r.predicate&&r.predicate(n)}));return 1==c(r).length?r[c(r)[0]]:U},load:function(r,t){return function(r,t){var e=(t=t||{}).filename||"load.js",i=(r+"").replace(/\r\n/g,"\n").replace(/\r/g,"\n");"\n"!==i[i.length-1]&&(i+="\n"),i.charCodeAt(0)===o&&(i=i.slice(1));var u=function(r,t,e){this.name=r||"YAMLException",this.reason=t,this.mark=e,this.message=(this.reason||"(unknown reason)")+(this.mark?" at "+this.mark.toString():""),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=(new Error).stack||""},a=function(r,t){return new u(r,t,function(r,t,e,i,o){if(!(this instanceof a))return new a(r,t,e,i,o);void 0===i&&(i=r),void 0===o&&(o=r),this.name=t||null,this.buffer=r,this.position=e,this.line=i,this.column=o})},c={};if(t.schema)switch(t.schema){case"core":c=function(){var n={},r=[B(Date,"timestamp"),B(Boolean,"bool"),B(Number,"float"),B(Number,"int"),B(null,"null"),B(String,"str"),B(void 0,"omap"),B(void 0,"pairs"),B(void 0,"seq"),B(void 0,"map")];return r.forEach((function(r){n[r.tag]=r})),{Schema:t,implicit:[new(t=U.constructor)("tag:yaml.org,2002:bool",{kind:"scalar",resolve:function(n){if(null===n)return!1;var r=n.length;return r>=1&&r<=5&&M(d).test(n)||r>=1&&r<=5&&M(b).test(n)}}),new(t)("tag:yaml.org,2002:float",{kind:"scalar",resolve:function(n){if(null===n)return!1;var r=n.length;if(!r||"-"===n[r-1]||"+"===n[r-1])return!1;if("."===n[r-1])return!1;if(!w.test(n))return!1;var t=L(n);return!isNaN(t)&&isFinite(t)}}),new(t)("tag:yaml.org,2002:int",{kind:"scalar",resolve:function(n){return null!==n&&("0"===n||/^[1-9][0-9_]*$/.test(_(n)))}}),new(t)("tag:yaml.org,2002:null",{kind:"scalar",resolve:function(n){if(null===n)return!0;var r=n.length;return 1===r&&"~"===n||r>=2&&r<=4&&M(S).test(n)}}),new(t)("tag:yaml.org,2002:timestamp",{kind:"scalar",resolve:function(n){return null!==n&&(null!==O.exec(n)||null!==E.exec(n))}}),new(t)("tag:yaml.org,2002:omap",{kind:"sequence",construct:function(n){return n}}),new(t)("tag:yaml.org,2002:pairs",{kind:"sequence",construct:function(n){if(null===n)return[];for(var r,t,e,i,o,u=new Array(n.length),a=0,c=n.length;a<c;a+=1)if(r=n[a],v(r)&&(t=Object.keys(r),1===t.length))e=t[0],i=r[e],o=new Array(2),o[0]=e,o[1]=i,u[a]=o;else u[a]=null;return u}}),new(t)("tag:yaml.org,2002:seq",{kind:"sequence",construct:function(n){return null!==n?n:[]}}),new(t)("tag:yaml.org,2002:map",{kind:"mapping",construct:function(n){return null!==n?n:{}}})],explicit:r,compiledImplicit:[],compiledExplicit:[],compiledTypeMap:n,resolve:function(n){for(var r,t=0,e=this.implicit.length;t<e;t+=1)if((r=this.implicit[t]).resolve(n))return r.tag;return"tag:yaml.org,2002:str"},getTypeMap:function(){if(y(this.compiledTypeMap)){var n;for(n in this.compiledExplicit)i.call(this.compiledExplicit,n)&&(this.compiledTypeMap[n]=this.compiledExplicit[n]);for(n in this.compiledImplicit)i.call(this.compiledImplicit,n)&&(this.compiledTypeMap[n]=this.compiledImplicit[n])}return this.compiledTypeMap}}}();break;default:throw new Error("schema must be one of `core`")}var f=function(r){try{return r.compose(i)}catch(r){throw a("can not read a block mapping entry",r)}}(new function(r,t){var o,f,l,s,p,h,g=a({},(o={44:",",91:"[",93:"]",123:"{",125:"}"},f={32:32,9:9,10:10,13:13},l={45:"-",58:":"},s=a({},o,l),p=t.onWarning||function(){},h=function(n,r){throw a(n,r)},t.customTags&&t.customTags.forEach((function(n){var r;if("string"==typeof n)r=t.schema.compiledTypeMap["!<!>"+n];else if(v(n)&&v(n.tag))r=t.schema.compiledTypeMap["!<!>"+n.tag];else if(v(n)&&m(n.tag))for(var e=0,i=n.types.length;e<i;e+=1)r=t.schema.compiledTypeMap["!<!>"+n.types[e]];t.schema.compiledTypeMap[n]=r})),{reader:new function(n){this.string=n,this.line=0,this.position=0,this.lineStart=0,this.lineIndent=0,this.lines=[""]},parser:new function(r,t){var e,o,u,a,c=function(r){var t=r.reader.string,e=r.reader.position,i=r.reader.line,o=r.reader.lineStart;if(e<t.length){var u=t.charCodeAt(e);if(63===u&&58===t.charCodeAt(e+1))return!0}return!1}(r)||!1;this.kind=-1,this.result=null,this.implicit=c,this.documents=[],this.checkLineBreaks=function(r,t,e){for(var i=r.reader.string,o=r.reader.position;i.charCodeAt(o)===T.charCodeAt(0)&&o<i.length;)o++;if(o===i.length||i.charCodeAt(o)===T.charCodeAt(2)||i.charCodeAt(o)===T.charCodeAt(1))r.reader.position=o;else{if(c&&t&&e===r.kind)return!0;throw new Error("expected a line break, tab or space")}},this.parse=function(c){var g,v,y,d,b=r.reader.string,S=r.reader.position;for(a=new Array,o=!1;b.charCodeAt(S)===T.charCodeAt(2);)S++;if(o=1,b.charCodeAt(S)===l["-"].charCodeAt(0)&&b.charCodeAt(S+1)===l["-"].charCodeAt(0)&&b.charCodeAt(S+2)===l["-"].charCodeAt(0)){for(S+=3;b.charCodeAt(S)===T.charCodeAt(2);)S++;e=!0}if(d=r.reader.line,r.reader.position=S,!c)return this.parseNext();for(v=-1;r.reader.position<b.length;){if(v=this.documents.length,d<r.reader.line)d=r.reader.line,r.reader.lineIndent=r.reader.lineStart,r.kind=this.parseNext(),u=r.reader.line;else{if(this.documents[v-1]&&this.documents[v-1].endLine!==u)throw new Error("Document cannot contain more than one content");r.kind=this.parseNext()}y=b.slice(r.documents[v].start,r.documents[v].end),g=t.schema.compiledTypeMap[r.documents[v].tag],r.documents[v].root=g.construct(r.documents[v].root,r.documents[v].tag),this.documents.push(y),a.push(r.documents[v].root)}return a.length?1===a.length?a[0]:a:void 0},this.parseNext=function(){var e,c,f,p=r.reader.string,y=r.reader.position,d=r.reader.line,b={start:y,end:null,tag:null,root:null,startLine:d,endLine:null};return c=function(r,t,e){var i,o,u=t.schema.compiledTypeMap;if(e.position<t.reader.string.length){if("!"!==(i=t.reader.string[e.position]))return null;if("<"===(o=t.reader.string[e.position+1])){for(e.position+=2;">"!==t.reader.string[e.position];)e.position++;e.position++}else e.position++;u[i]||h("unknown tag <"+i+">",e),e.tag=i}}.call(this,0,r,b),f={level:0,result:null},function(r,t,e,i){for(var o,u=t.reader.string,a=t.reader.position,c=-1;u.charCodeAt(a)===T.charCodeAt(2);)a++;c=u.charCodeAt(a)===l["-".charCodeAt(0)]?0:u.charCodeAt(a)===s[":".charCodeAt(0)]?1:c,a=t.reader.position,o=function(r,t,e,i,o){var u,a,c;if(t.reader.position<t.reader.string.length){if(u=t.reader.string.slice(t.reader.position),"|"!==u[0]&&">"!==u[0]||(a=function(r,t,e){var i=r.reader.string,o=r.reader.position,u=r.reader.lineIndent;if(">"===i[o]||"|"===i[o]){for(e.style=i[o],o++,t.chomping=0,t.indentation=0;"+"!==i[o]&&"-"!==i[o]||(t.chomping="+"===i[o]?1:-1,o++);i.charCodeAt(o)>=48&&i.charCodeAt(o)<=57&&(t.indentation=i.charCodeAt(o)-48,o++);r.checkLineBreaks(r,0,0);for(var a=o;i.charCodeAt(o)===T.charCodeAt(2);)o++;r.reader.position=o}return a}(r,e)),c=function(r,t,e,i){var o,u,a=r.reader.string,c=r.reader.position;if(34===a.charCodeAt(c)||39===a.charCodeAt(c)){o=a.charCodeAt(c);var f=c+1;for(e.style=34===o?'"':"'";f<a.length;){if(a.charCodeAt(f)===o){f++;break}if(92===a.charCodeAt(f)&&f+1<a.length){if(f++,92===a.charCodeAt(f)||34===a.charCodeAt(f)||39===a.charCodeAt(f)||47===a.charCodeAt(f))f++;else if(110===a.charCodeAt(f))f++;else if(114===a.charCodeAt(f))f++;else if(116===a.charCodeAt(f))f++;else if(118===a.charCodeAt(f))f++;else if(98===a.charCodeAt(f))f++;else if(120===a.charCodeAt(f))f+=2;else if(117===a.charCodeAt(f))f+=4;else{if(85!==a.charCodeAt(f))throw new Error("unexpected escape character");f+=8}f++}else f++}r.reader.position=f,e.result=function(n){for(var r=n.length,t=0,e="",i=!1;t<r;)i?"x"===n[t]?(e+=String.fromCharCode(parseInt(n.slice(t+1,t+3),16)),t+=2):"u"===n[t]?(e+=String.fromCharCode(parseInt(n.slice(t+1,t+5),16)),t+=4):"U"===n[t]?(e+=String.fromCharCode(parseInt(n.slice(t+1,t+9),16)),t+=8):e+=function(n){switch(n){case"n":"\n";case"r":"\r";case"t":"\t";case"v":"\v";case"b":"\b";default:return n}}(n[t]),i=!1,t++:"\\"===n[t]?(i=!0,t++):(e+=n[t],t++);return e}(a.slice(c+1,f-1))}else{for(u=c,i.kind=2;c<a.length&&-1===T.indexOf(a[c])&&-1==="@!&%".indexOf(a[c])&&":"!==a[c]&&-1===",[]{}".indexOf(a[c]);){if(":"===a[c+1]&&-1===T.indexOf(a[c+2]||""))break;c++}r.reader.position=c,e.result=a.slice(u,c),":"===a[c]&&r.reader.position++}return!0}}(r,0,f))||(f.result=null,p("while scanning a plain scalar",b));var g=f.result,m=t.schema.resolve(g);null===b.tag&&(b.tag=m),b.root=g,b.end=r.reader.position,b.endLine=r.reader.line,this.documents[this.documents.length]=b,b}}).compose(i);return t.listener&&t.listener("open",f),t.listener&&t.listener("close",f),f}}};n.exports.main=n.exports,e.exports=n.exports,e})()})();

// --- API Worker Logic ---

const GITHUB_REPO_URL = "https://raw.githubusercontent.com/itsyebekhe/PSG/main/";
const STRUCTURE_URL = GITHUB_REPO_URL + "index.html";
const CACHE_TTL = 3600; // Cache the structured data for 1 hour

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const params = url.searchParams;

        const path = params.get('path');
        const outputFormat = (params.get('output') || 'base64').toLowerCase();
        const filename = params.get('filename');
        const limit = parseInt(params.get('limit'), 10) || 0;

        if (!path) {
            return new Response('Error: "path" parameter is required (e.g., path=Standard/Clash/Mix).', { status: 400 });
        }

        try {
            // 1. Get structured data, using Cloudflare's cache
            const structuredData = await getStructuredData(ctx);
            
            // 2. Find the source URL from the path
            const pathParts = path.split('/');
            if (pathParts.length !== 3) {
                return new Response('Error: "path" must be in the format "Config/Client/Name".', { status: 400 });
            }
            const [configType, ipType, subName] = pathParts;
            const sourceUrl = structuredData?.[configType]?.[ipType]?.[subName];

            if (!sourceUrl) {
                return new Response(`Error: Subscription path "${path}" not found.`, { status: 404 });
            }

            // 3. Fetch the source subscription content
            const sourceResponse = await fetch(sourceUrl, { headers: { 'User-Agent': 'PSG-API/2.0' } });
            if (!sourceResponse.ok) {
                return new Response(`Error: Could not fetch source URL at ${sourceUrl}. Status: ${sourceResponse.status}`, { status: 502 });
            }
            const sourceContent = await sourceResponse.text();
            
            // 4. Determine input format and parse into universal node format
            let universalNodes = parseSourceContent(sourceContent, sourceUrl);
            
            if (universalNodes.length === 0) {
                 return new Response('Error: No valid proxy nodes found in the source subscription.', { status: 400 });
            }
            
            // 5. Apply node limit if specified
            if (limit > 0 && universalNodes.length > limit) {
                // Shuffle and slice
                for (let i = universalNodes.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [universalNodes[i], universalNodes[j]] = [universalNodes[j], universalNodes[i]];
                }
                universalNodes = universalNodes.slice(0, limit);
            }

            // 6. Generate the desired output
            let outputContent = '';
            let contentType = 'text/plain; charset=utf-8';
            const defaultFilename = filename || `${subName.replace(/\s/g, '_')}.${outputFormat === 'clash' ? 'yaml' : (outputFormat === 'singbox' ? 'json' : 'txt')}`;

            switch (outputFormat) {
                case 'clash':
                    outputContent = await generateClashOutput(universalNodes);
                    contentType = 'application/x-yaml; charset=utf-8';
                    break;
                case 'singbox':
                    outputContent = await generateSingboxOutput(universalNodes);
                    contentType = 'application/json; charset=utf-8';
                    break;
                case 'base64':
                default:
                    outputContent = generateBase64Output(universalNodes);
                    break;
            }
            
            // 7. Return the final response
            return new Response(outputContent, {
                headers: {
                    'Content-Type': contentType,
                    'Content-Disposition': `attachment; filename="${defaultFilename}"`
                }
            });

        } catch (error) {
            console.error(error);
            return new Response(`An unexpected error occurred: ${error.message}\n${error.stack}`, { status: 500 });
        }
    },
};

// --- Data Fetching and Caching ---
async function getStructuredData(ctx) {
    const cache = caches.default;
    let response = await cache.match(STRUCTURE_URL);

    if (!response) {
        console.log("Cache miss. Fetching fresh structured data...");
        const htmlResponse = await fetch(STRUCTURE_URL);
        if (!htmlResponse.ok) throw new Error("Could not fetch the project's index.html to get structure.");
        
        const html = await htmlResponse.text();
        const jsonMatch = html.match(/const structuredData = (\{.*?\});/s);
        if (!jsonMatch || !jsonMatch[1]) throw new Error("Could not find structuredData JSON in the index.html.");
        
        const jsonData = jsonMatch[1];
        response = new Response(jsonData, {
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': `s-maxage=${CACHE_TTL}`
            }
        });
        ctx.waitUntil(cache.put(STRUCTURE_URL, response.clone()));
    } else {
        console.log("Cache hit. Using cached structured data.");
    }
    
    return response.json();
}

// --- Parsers and Generators (from your script) ---

function parseSourceContent(content, urlHint) {
    // Auto-detects format and returns universal nodes
    // Try Base64 first
    try {
        const decoded = atob(content);
        if (decoded.includes('://')) { // Simple heuristic
            const uris = decoded.split(/[\n\r]+/).filter(Boolean);
            return uris.map(uri => ({ uri, parsed: configParse(uri) })).filter(n => n.parsed);
        }
    } catch (e) { /* Not Base64, continue */ }

    // Try Clash (YAML)
    try {
        const parsedYaml = jsyaml.load(content);
        if (parsedYaml && Array.isArray(parsedYaml.proxies)) {
             return parsedYaml.proxies.map(clashNodeToUniversal).filter(Boolean);
        }
    } catch (e) { /* Not YAML, continue */ }
    
    // Try Sing-box (JSON)
    try {
        const parsedJson = JSON.parse(content);
         if (parsedJson && Array.isArray(parsedJson.outbounds)) {
             const utilityTypes = ['selector', 'urltest', 'direct', 'block', 'dns'];
             return parsedJson.outbounds
                 .filter(o => o.type && !utilityTypes.includes(o.type))
                 .map(singboxNodeToUniversal).filter(Boolean);
        }
    } catch (e) { /* Not JSON */ }

    throw new Error("Could not determine the format of the source subscription.");
}

function clashNodeToUniversal(p) {
    // Converts a Clash node object to a universal format for re-compiling.
    // This is a simplified conversion.
    const hash = encodeURIComponent(p.name);
    let uri = `${p.type}://${p.uuid || p.password}@${p.server}:${p.port}#${hash}`;
    return { uri, parsed: configParse(uri) };
}

function singboxNodeToUniversal(o) {
    // Converts a Sing-box outbound object to a universal format.
    const hash = encodeURIComponent(o.tag);
    let uri = `${o.type}://${o.uuid || o.password}@${o.server}:${o.server_port}#${hash}`;
    // Add params for TLS, etc. if needed for perfect conversion
    return { uri, parsed: configParse(uri) };
}

function configParse(uri) {
    try {
        const protocolMatch = uri.match(/^([a-z0-9]+):\/\//);
        if (!protocolMatch) return null;
        const protocol = protocolMatch[1];

        switch (protocol) {
            case 'vmess': {
                const b64 = uri.substring(8);
                const decoded = JSON.parse(atob(b64));
                decoded.protocol = 'vmess';
                return decoded;
            }
            case 'vless':
            case 'trojan':
            case 'ss':
            case 'tuic':
            case 'hy2': {
                let url;
                try { url = new URL(uri); } catch (e) { return null; }
                const hash = decodeURIComponent(url.hash.substring(1)) || `psg_${Math.random().toString(16).slice(2)}`;
                if (protocol === 'ss') {
                    let userInfo = atob(decodeURIComponent(url.host));
                    if (!userInfo.includes(':')) userInfo = decodeURIComponent(url.username);
                    if (!userInfo.includes(':')) return null;

                    const [method, password] = userInfo.split(':', 2);
                    const hostPortPart = uri.substring(uri.indexOf('@') + 1, uri.indexOf('#'));
                    const [hostname, port] = hostPortPart.split(':');
                    return { protocol, encryption_method: method, password, hostname, port: parseInt(port, 10), hash };
                }
                const params = {};
                url.searchParams.forEach((value, key) => { params[key.toLowerCase()] = value; });
                return { protocol, username: decodeURIComponent(url.username), hostname: url.hostname, port: parseInt(url.port, 10), params, hash };
            }
            default: return null;
        }
    } catch (e) { return null; }
}

function generateBase64Output(nodes) {
    return btoa(nodes.map(n => n.uri).join('\n'));
}

async function generateClashOutput(nodes) {
    const proxyDetails = nodes.map(node => {
        const p = node.parsed;
        let clashNode = null;
        if (!p) return null;
        switch(p.protocol) {
            case 'vmess': clashNode = { type: 'vmess', name: p.ps, server: p.add, port: parseInt(p.port), uuid: p.id, alterId: parseInt(p.aid) || 0, cipher: 'auto', udp: true, network: p.net, 'ws-opts': p.net === 'ws' ? { path: (p.path || '/').split('?')[0], headers: { Host: p.host || p.add } } : undefined }; break;
            case 'vless': clashNode = { type: 'vless', name: p.hash, server: p.hostname, port: p.port, uuid: p.username, udp: true, network: p.params?.type, tls: p.params?.security === 'tls' || p.params?.security === 'reality', 'client-fingerprint': 'chrome', 'ws-opts': p.params?.type === 'ws' ? { path: p.params.path } : undefined, 'reality-opts': p.params?.security === 'reality' ? { 'public-key': p.params.pbk, 'short-id': p.params.sid } : undefined, 'servername': p.params?.sni }; break;
            case 'trojan': clashNode = { type: 'trojan', name: p.hash, server: p.hostname, port: p.port, password: p.username, udp: true, sni: p.params?.sni }; break;
            case 'ss': clashNode = { type: 'ss', name: p.hash, server: p.hostname, port: p.port, cipher: p.encryption_method, password: p.password, udp: true }; break;
        }
        if (clashNode) Object.keys(clashNode).forEach(key => clashNode[key] === undefined && delete clashNode[key]);
        return clashNode;
    }).filter(Boolean);

    let proxiesSection = 'proxies:\n';
    proxyDetails.forEach(p => { proxiesSection += `  - ${JSON.stringify(p)}\n`; });
    let proxyGroupSection = 'proxy-groups:\n  - name: "PROXY"\n    type: select\n    proxies:\n';
    proxyDetails.forEach(p => { proxyGroupSection += `      - '${p.name.replace(/'/g, "''")}'\n`; });
    
    const template = `port: 7890\nsocks-port: 7891\nallow-lan: true\nmode: Rule\nlog-level: info\nexternal-controller: 0.0.0.0:9090\ndns:\n  enabled: true\n  nameserver:\n    - 1.1.1.1\n    - 8.8.8.8\n  fallback:\n    - 1.0.0.1\n    - https://dns.google/dns-query\n\n${proxiesSection}\n${proxyGroupSection}\nrules:\n  - MATCH,PROXY\n`;
    return template;
}

async function generateSingboxOutput(nodes) {
    const outbounds = nodes.map(node => {
        const p = node.parsed;
        if (!p) return null;
        let singboxNode = null;
        const isTlsEnabled = p.params?.security === 'tls' || p.params?.security === 'reality';
        const tlsSettings = isTlsEnabled ? { enabled: true, server_name: p.params?.sni, reality: p.params?.security === 'reality' ? { enabled: true, public_key: p.params.pbk, short_id: p.params.sid } : undefined } : undefined;
        let transport = p.params?.type ? { type: p.params.type, path: p.params.path, headers: { Host: p.params.host } } : undefined;

        switch(p.protocol) {
            case 'vmess': singboxNode = { tag: p.ps, type: 'vmess', server: p.add, server_port: parseInt(p.port), uuid: p.id, alter_id: parseInt(p.aid), security: 'auto', tls: p.tls === 'tls' ? { enabled: true, server_name: p.host } : undefined, transport: p.net ? { type: p.net, path: p.path, headers: { Host: p.host } } : undefined }; break;
            case 'vless': singboxNode = { tag: p.hash, type: 'vless', server: p.hostname, server_port: p.port, uuid: p.username, tls: tlsSettings, transport }; break;
            case 'trojan': singboxNode = { tag: p.hash, type: 'trojan', server: p.hostname, server_port: p.port, password: p.username, tls: tlsSettings, transport }; break;
            case 'ss': singboxNode = { tag: p.hash, type: 'shadowsocks', server: p.hostname, server_port: p.port, method: p.encryption_method, password: p.password }; break;
        }
        return singboxNode;
    }).filter(Boolean);

    const template = {
        "log": { "level": "info", "timestamp": true },
        "outbounds": [
            ...outbounds,
            { "tag": "PROXY", "type": "selector", "outbounds": outbounds.map(o => o.tag) },
            { "tag": "direct", "type": "direct" },
            { "tag": "block", "type": "block" }
        ],
        "route": { "rules": [{ "protocol": "dns", "outbound": "direct" }, { "outbound": "PROXY" }] }
    };
    return JSON.stringify(template, null, 2);
}
