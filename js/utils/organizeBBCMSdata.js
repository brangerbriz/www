function organizeCMSdata(res){
    let posts = []
    let blogData = res.data[1].child_component
    let featuredTags = {}
    let tagData = res.data[2].child_component
    let projects = []
    let workData = res.data[3].child_component

    function tags2Arr(str){
        return str.substring(1,str.length-1)
                  .split(',')
                  .map(t=>t.replace(/"/g,''))
    }

    function shouldPublish( post ){
        let publish, start, end

        post.data.forEach(d=>{
            if(d.name=="Published") publish = d.value
            if(d.name=="Post Start") start = d.value
            if(d.name=="Post End") end = d.value
        })

        if( publish=="0" ) return false
        else if( start!=="" && end!==""){
            let from = new Date(start)
            let to   = new Date(end)
            let check = new Date()
            return (check >= from && check <= to)
        } else return true
    }

    for(let post in blogData){
        if( shouldPublish(blogData[post]) ){
            let p = {}
            blogData[post].data.forEach(d=>{
                // page content
                if(d.name=="Post Title")
                    p.title = d.value
                else if(d.name=="written by")
                    p.author = d.value
                else if(d.name=="Create on"){
                    p.date = new Date(d.value)
                    p.year = p.date.getFullYear()
                }
                else if(d.name=="Description")
                    p.content = d.value
                else if(d.name=="Tags")
                    p.tags = tags2Arr(d.value)
                // meta info
                else if(d.name=="Summary")
                    p.summary = d.value
                else if(d.name=="Social Media Thumbnail")
                    p.socialImg = d.value
                else if(d.name=="slug")
                    p.slug = d.value
                else if(d.name=="Tweet Link")
                    p.tweet = d.value
            })
            posts.push(p)
        }
    }
    posts.sort(function(a,b){ return b.date - a.date })

    for(let work in workData){
        if( shouldPublish(workData[work]) ){
            let p = {}
            workData[work].data.forEach(d=>{
                // content
                if(d.name=="Header Image")
                    p.headerImg = d.value
                else if(d.name=="Post Title")
                    p.title = d.value
                else if(d.name=="Post Sub Title")
                    p.subTitle = d.value
                // -----
                else if(d.name=="year")
                    p.year = parseInt(d.value)
                else if(d.name=="url")
                    p.url = d.value
                else if(d.name=="services")
                    p.services = d.value
                else if(d.name=="recognition")
                    p.recognition = d.value
                else if(d.name=="results")
                    p.results = d.value
                else if(d.name=="clients")
                    p.clients = d.value
                // -----
                else if(d.name=="Post Content v2")
                    p.content = d.value
                else if(d.name=="Tags")
                    p.tags = tags2Arr(d.value)
                // meta info
                else if(d.name=="Create on")
                    p.date = new Date(d.value)
                else if(d.name=="Summary")
                    p.summary = d.value
                else if(d.name=="Feature on Home")
                    p.featured = (d.value=="1") ? true : false
                else if(d.name=="Post Type")
                    p.type = d.value
                else if(d.name=="Social Media Thumbnail")
                    p.socialImg = d.value
                else if(d.name=="slug")
                    p.slug = d.value
            })
            projects.push(p)
        }
    }
    projects.sort(function(a,b){ return b.year - a.year })

    for(let d in tagData){
        let tagName = tagData[d].data[0].value
        let tagInfo = tagData[d].data[1].value
        featuredTags[tagName.toLowerCase()] = (tagInfo!=="") ? tagInfo : undefined
    }

    return {
        featuredTags:featuredTags,
        blog:posts,
        work:projects,
        all:[...posts,...projects].sort(function(a,b){return b.year - a.year})
    }
}
