import { auth } from "@/auth";

export default auth((req) => {
  const protectedRoutes = ["/form", "/mein-konto"];

  if (!req.auth && protectedRoutes.includes(req.nextUrl.pathname)) {
    const newUrl = new URL("/sign-in", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});
