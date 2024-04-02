import { permittedRoles } from "../../../../../middleware";

const guard = (req, res, next) => {
  console.log(req.user._id);
  if (
    req.path.match(new RegExp("/v1/users/*")) &&
    req.params[0]?.replace("/", "") === req.user._id
  )
    return next();
  return permittedRoles(["admin"])(req, res, next);
};

export default guard;
