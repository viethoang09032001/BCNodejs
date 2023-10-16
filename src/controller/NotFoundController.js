import express from 'express'
let session = {}
const notFound = (req,res) =>{
    if(req.session.user){
        session = req.session
    } else {
        delete session.user
      }
    return res.render("pagenotfound",{data:{title:'404 page not found',content:'khong tim thay trang!', session:session}})
}
export default notFound