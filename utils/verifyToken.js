import jwt from 'jsonwebtoken'

export const verifyToken = (req, res,next) => {
   const {token} = req.query
   console.log(token)
   if (!token) {
      
      return res.status(401).json({ success: false, message: "No estas autorizado!" })
   }

   // if token is exist then verify the token
   jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
         return res.status(401).json({ success: false, message: "El Token es invalido" })
      }
      req.user = user
      console.log(user)
      next()
   })
}


export const verifyUser = (req, res, next) => {
   const {id}=req.query
   verifyToken(req, res, next, () => {
      if ((":"+req.user.id) === req.query.id || req.user.role === 'admin') {
         console.log("verified")
         next()
      } else {
         return res.status(401).json({ success: false, message: "No estas autenticado" })
      }
   })
}


export const verifyAdmin = (req, res, next) => {
   verifyToken(req, res, next, () => {
      if (req.user.role === 'admin') {
         next()
      } else {
         return res.status(401).json({ success: false, message: "No estas autorizado" })
      }
   })
} 