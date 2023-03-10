import actions from 'src/modules/blog/home/blogHomeActions';

const INITIAL_BLOG_SIZE = 10;

const initialData = {
  rows: [] as Array<any>,
  count: 0,
  loading: false,
  pagination: {
    current: 1,
    pageSize: INITIAL_BLOG_SIZE,
  },
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.PAGINATION_CHANGED) {
    return {
      ...state,
      pagination: payload || {
        current: 1,
        pageSize: INITIAL_BLOG_SIZE,
      },
    };
  }

  if (type === actions.FETCH_STARTED) {
    return {
      ...state,
      loading: true,
      pagination:
        payload && payload.keepPagination
          ? state.pagination
          : {
              current: 1,
              pageSize: INITIAL_BLOG_SIZE,
            },
    };
  }

  if (type === actions.FETCH_SUCCESS) {
    return {
      ...state,
      loading: false,
      rows: payload.rows,
      count: payload.count,
    };
  }

  if (type === actions.FETCH_ERROR) {
    return {
      ...state,
      loading: false,
      rows: [],
      count: 0,
    };
  }

  return state;
};
