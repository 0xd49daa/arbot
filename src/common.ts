export const getSession = (ctx: any) => ctx.session;

export const checkIfLogged = (ctx: any) => {
  if (!getSession(ctx).wallet) {
    ctx.reply('Please login first');
    return false;
  }

	return true;
};
