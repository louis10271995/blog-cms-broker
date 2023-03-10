export default (app) => {
  app.post(
    `/tenant/:tenantId/open-x`,
    require('./openxCreate').default,
  );
  app.put(
    `/tenant/:tenantId/open-x/:id`,
    require('./openxUpdate').default,
  );
  app.post(
    `/tenant/:tenantId/open-x/import`,
    require('./openxImport').default,
  );
  app.delete(
    `/tenant/:tenantId/open-x`,
    require('./openxDestroy').default,
  );
  app.get(
    `/tenant/:tenantId/open-x/autocomplete`,
    require('./openxAutocomplete').default,
  );
  app.get(
    `/tenant/:tenantId/open-x`,
    require('./openxList').default,
  );
  app.get(
    `/tenant/:tenantId/open-x/:id`,
    require('./openxFind').default,
  );
};
