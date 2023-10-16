import  express   from "express"
let session = {}
const getAboutPage = (req,res) => {
    if(req.session.user){
        session = req.session
      } else {
        delete session.user
      }
    return res.render("home",{data:{title: 'About page', content: 'admin@gamail.com',page:'about', session: session}})
}
export default getAboutPage