export default (app)=>{
  const remotes = app.remotes()

  const limitDefault = 10

  const before = async function (ctx) {
    let filter = {}
    if (ctx.args && ctx.args.filter) {
      filter = ctx.args.filter
    }
    if(filter.paginator != false){
      const limit = filter.limit || ctx.req.query.limit || limitDefault
      const page = filter.page || ctx.req.query.page || 0
      const skip = limit*(page)
      ctx.args.filter = {...filter, limit, skip}
    }
  }

  const after = async function (ctx) {
    let filter = {}
    if (ctx.args && ctx.args.filter) {
      filter = ctx.args.filter
    }
    if (filter.paginator != false) {
      ctx.result = {
        items: ctx.result,
        totalItems: await ctx.method.ctor.count({where:ctx.instance})
      }
    }
  }

  remotes.before('*.find', before)
  remotes.after('*.find', after)

  // Tags rl __get__exercises
  // remotes.before('Tag.prototype.__get__exercises', before)
  // remotes.after('Tag.prototype.__get__exercises', after)

}
