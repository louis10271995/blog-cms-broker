import { i18n } from 'src/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import AuthorView from 'src/view/shared/view/AuthorView';
import blogFindActions from 'src/modules/blog/find/blogFindActions';
import blogFindSelectors from 'src/modules/blog/find/blogFindSelectors';
import CommentPage from 'src/view/home/blog/CommentPage';
import HtmlView from 'src/view/shared/view/HtmlView';
import Layout from 'src/view/home/Layout';
import MDBox from 'src/mui/components/MDBox';
import PageContent from 'src/view/shared/view/PageContent';
import Spinner from 'src/view/shared/Spinner';
import TopBrokersView from 'src/view/home/broker/components/TopBrokersView';
import Breadcrumb from 'src/view/home/Breadcrumb';

const BlogDetailPage = () => {
  const [dispatched, setDispatched] = useState(false);

  const dispatch = useDispatch();

  const match = useRouteMatch();

  const loading = useSelector(
    blogFindSelectors.selectLoading,
  );

  const record = useSelector(
    blogFindSelectors.selectRecord,
  );

  useEffect(() => {
    dispatch(blogFindActions.doFind(match.url));
    setDispatched(true);
  }, [match.url]);

  return (
    <>
      {loading && <Spinner />}
      {dispatched && !loading && record && (
        <Layout
          title={record.name}
          keywords={[record.metakeywords]}
          description={record.metadescription}
        >
          <MDBox
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <>
              <PageContent>
                <Breadcrumb
                  items={[
                    {
                      name: 'Broker Blog',
                      route: '/blog',
                    },
                    {
                      name: record.name,
                      route: `/blog/${record.name_normalized}`,
                    },
                  ]}
                />
                <HtmlView value={record.content} />
                <CommentPage record={record} />
              </PageContent>
              <AuthorView value={record.author} />
              <PageContent>
                <h3>{i18n('entities.home.top_brokers')}</h3>
                <TopBrokersView />
              </PageContent>
            </>
          </MDBox>
        </Layout>
      )}
    </>
  );
};

export default BlogDetailPage;
