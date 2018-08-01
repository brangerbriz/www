function updateLegacyBBElements(str){
    let parser = new DOMParser()

    function replaceHeading(parent,child,type){
        let h = document.createElement(type)
        while (child.childNodes.length > 0) {
            h.appendChild(child.childNodes[0])
        }
        parent.replaceChild(h,child)
    }

    function replaceQuote(parent,child){
        let q = document.createElement('span')
        q.className = "quote"
        let credit = child.getAttribute('credit')
        if(credit) q.setAttribute('data-credit',credit)
        let style = child.getAttribute('style')
        if(style) q.setAttribute('style',style)
        q.textContent = child.textContent
        parent.replaceChild(q,child)
    }

    function replaceCode(parent,child){
        let pre = document.createElement('pre')
        pre.className = "code"
        let code = document.createElement('code')
        code.className = "js"
        code.textContent = child.textContent
        pre.appendChild(code)

        let wrap = child.getAttribute('wrap')
        if(wrap) code.setAttribute('data-wrap','true')
        let language = child.getAttribute('language')
        if(language) code.className = language
        let style = child.getAttribute('style')
        if(style) pre.setAttribute('style',style)

        parent.replaceChild(pre,child)
    }

    function replaceMedia(parent,child){
        let media = document.createElement('section')
        media.className = "media"
        let full = child.getAttribute('fullwidth')
        if(full) media.setAttribute('data-fullwidth',full)
        let style = child.getAttribute('style')
        if(style) media.setAttribute('style',style)
        let img
        if(child.children.length>0){//should only ever be 1 or 0
            img = document.createElement('img')
            let alt = child.children[0].getAttribute('alt')
            if(alt) img.setAttribute('alt',alt)
            let style = child.children[0].getAttribute('style')
            if(style) img.setAttribute('style',style)
            let src = child.children[0].getAttribute('src')
            img.setAttribute('src',src)
        }
        media.appendChild(img)
        parent.replaceChild(media,child)
    }

    function replaceNote(parent,child){
        let info = child.getAttribute('info')
        let html = parser.parseFromString(info,'text/html')
        let body = html.children[0].children[1]
        let str = ""
        for (let n = 0; n < body.childNodes.length; n++) {
            if(body.childNodes[n].localName=="a"){
                let href = body.childNodes[n].attributes.href.nodeValue
                let txt = body.childNodes[n].text
                    txt = txt.replace(/\t/g, '')
                    txt = txt.replace(/\n/g, '')
                str += `[${txt}](${href})`
            } else if(body.childNodes[n].localName=="code"){
                let txt = body.childNodes[n].textContent
                    txt = txt.replace(/\t/g, '')
                    txt = txt.replace(/\n/g, '')
                str += '`'+txt+'``'
            } else if(body.childNodes[n].localName=="br"){
                str += "\n"
            } else {
                let txt = body.childNodes[n].nodeValue
                    txt = txt.replace(/\t/g, '')
                    txt = txt.replace(/\n/g, '')
                str += txt
            }
        }
        let note = document.createElement('span')
        note.className = "marginal-note"
        note.setAttribute('data-info',str)
        parent.replaceChild(note,child)
    }

    function replaceDivP(parent,child,type){
        let p = document.createElement(type)
        while (child.childNodes.length > 0) {
            p.appendChild(child.childNodes[0])
        }
        for (let c = 0; c < p.children.length; c++) {
            if(p.children[c].localName=="bb-quote")
                replaceQuote(p,p.children[c])
            else if(p.children[c].localName=="bb-media")
                replaceMedia(p,p.children[c])
            else if(p.children[c].localName=="bb-note")
                replaceNote(p,p.children[c])
            else if(p.children[c].localName=="div")
                   replaceNormDiv(p,p.children[c])
        }
        parent.replaceChild(p,child)
    }

    function replaceNormDiv(parent,child){
        let p = document.createElement('div')
        let style = child.getAttribute('style')
        if(style) p.setAttribute('style',style)
        while (child.childNodes.length > 0) {
            p.appendChild(child.childNodes[0])
        }
        for (let c = 0; c < p.children.length; c++) {
            if(p.children[c].localName=="bb-quote")
                replaceQuote(p,p.children[c])
            else if(p.children[c].localName=="bb-media")
                replaceMedia(p,p.children[c])
            else if(p.children[c].localName=="bb-note")
                replaceNote(p,p.children[c])
            else if(p.children[c].localName=="bb-h1")
                replaceHeading(p,p.children[c],'h1')
            else if(p.children[c].localName=="bb-h2")
                replaceHeading(p,p.children[c],'h2')
            else if(p.children[c].localName=="bb-h3")
                replaceHeading(p,p.children[c],'h3')
        }
        parent.replaceChild(p,child)
    }

    if(str.indexOf('<bb-')>=0){
        let dom = parser.parseFromString(str,'text/html')
        let body = dom.children[0].children[1]
        for (let i = 0; i < body.children.length; i++) {
            let child = body.children[i]

            // replace headers
            if(child.localName=="bb-h1"){
                replaceHeading(body,child,'h1')
            } else if(child.localName=="bb-h2"){
                replaceHeading(body,child,'h2')
            } else if(child.localName=="bb-h3"){
                replaceHeading(body,child,'h3')
            }

            // replace paragraphs and divs
            else if(child.localName=="bb-p"){
                replaceDivP(body,child,'p')
            } else if(child.localName=="bb-div"){
                replaceDivP(body,child,'div')
            } else if(child.localName=="div"){
                replaceNormDiv(body,child)
            }

            // replace quotes
            else if(child.localName=="bb-quote") replaceQuote(body,child)
            // replace media
            else if(child.localName=="bb-media") replaceMedia(body,child)
            // replace code
            else if(child.localName=="bb-code") replaceCode(body,child)

        }
        // console.log(body.children)
        str = [].map.call( body.children, function(node){
            return node.outerHTML
        }).join("")
    }
    return str
}
