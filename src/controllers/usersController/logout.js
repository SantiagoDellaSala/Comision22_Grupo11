module.exports=

logout= (req, res) => {
    req.session.destroy();
    res.cookie("userEmail", null, {
      maxAge: -1,
    });

    return res.redirect("/");
  }