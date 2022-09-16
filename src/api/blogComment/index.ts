export default (app) => {
  app.post(
    `/tenant/:tenantId/blog-comment`,
    require('./blogCommentCreate').default,
  );
  app.put(
    `/tenant/:tenantId/blog-comment/:id`,
    require('./blogCommentUpdate').default,
  );
  app.post(
    `/tenant/:tenantId/blog-comment/import`,
    require('./blogCommentImport').default,
  );
  app.delete(
    `/tenant/:tenantId/blog-comment`,
    require('./blogCommentDestroy').default,
  );
  app.post(
    `/tenant/:tenantId/blog-comment/review`,
    require('./blogCommentReview').default,
  );
  app.post(
    `/tenant/:tenantId/blog-comment/spam`,
    require('./blogCommentSpam').default,
  );
  app.get(
    `/tenant/:tenantId/blog-comment/autocomplete`,
    require('./blogCommentAutocomplete').default,
  );
  app.get(
    `/tenant/:tenantId/blog-comment`,
    require('./blogCommentList').default,
  );
  app.get(
    `/tenant/:tenantId/blog-comment/:id`,
    require('./blogCommentFind').default,
  );
};