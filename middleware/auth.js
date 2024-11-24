import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    const token = req.headers['token'];
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; // Attachez les infos de l'utilisateur
        next();
      } catch (err) {
        console.log(err)
        return res.status(401).json({ message: 'Token invalide' });
      }
    } else {
      return res.status(401).json({ message: 'Pas de token fourni' });
    }
  };