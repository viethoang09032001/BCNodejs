import express from 'express'
let session = {}
const getHomePage = (req,res) => {
    if(req.session.user){
        session = req.session
      } else {
        delete session.user
      }
    return res.render("home",{data:{title: 'homepage',page:'main', session: session}})
}

export default getHomePage