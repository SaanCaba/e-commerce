const GoogleStrategy = require("passport-google-oauth20").Strategy;
const co_passport = require("passport");

type UserData = {
    id: string,
    displayName: string
    name: {
        familyName: string
        givenName: string
    }
    emails: Array<{
        value: string
        verified: boolean
    }>
    provider: string
    _raw: string
    _json: any
}

co_passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: "/auth/google/callback",
			scope: ["profile", "email"],
		},
		function (accessToken :any, refreshToken:any, profile: UserData, callback: any) {
			callback(null, profile);
		}
	)
);

co_passport.serializeUser((user: UserData, done: any) => {
	done(null, user);
});

co_passport.deserializeUser((user: UserData, done: any) => {
	done(null, user);
});