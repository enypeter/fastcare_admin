import {DashboardLayout} from '@/layout/dashboard-layout';
import {MoreVertical} from 'lucide-react';
import {Button} from '@/components/ui/button';
import AddArticle from '@/components/form/help-desk/add-articles';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '@/services/store';
import {useEffect, useState} from 'react';
import {fetchArticles} from '@/services/thunks';
import {Pagination} from '@/components/ui/pagination';
import {Loader} from '@/components/ui/loading';

const Articles = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const {articles, loading, error, metaData} = useSelector(
    (state: RootState) => state.articles,
  );

  // local pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    dispatch(fetchArticles({page, pageSize}));
  }, [dispatch, page, pageSize]);

  return (
    <DashboardLayout>
      <div className="bg-gray-100 overflow-y-auto h-full">
        {/* Page Header */}
        <div className="flex items-center justify-between gap-6 mx-10 mt-16">
          <h1 className="text-2xl font-medium text-gray-700">All Articles</h1>
          <AddArticle />
        </div>

        {/* Card Section */}
        <div className="bg-white mt-10 py-6 mx-10 rounded-md mb-64 ">
          {loading ? (
            <div className="flex items-center justify-center h-60">
              <Loader />
            </div>
          ) : error ? (
            <div className="text-red-500 text-center py-10">{error}</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
                {articles.map(article => (
                  <div
                    key={article.id}
                    onClick={() =>
                      navigate(`/help-desk/articles/${article.id}`)
                    }
                    className="border border-primary rounded-lg shadow-md cursor-pointer"
                  >
                    <img
                      src={article.image}
                      alt={article.title}
                      className="rounded-md w-full object-cover mb-4 h-48"
                    />

                    <div className="p-2">
                      <div className="flex items-center justify-between mb-2">
                        <h2 className="text-lg font-semibold text-gray-800">
                          {article.title}
                        </h2>
                        <MoreVertical />
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>
                          {new Date(article.creationDate).toDateString()}
                        </span>
                        <span>{article.creatorName}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-md mb-2 p-2">
                      {article.body}
                    </p>

                    <div className="p-2 mb-6">
                      <Button
                        onClick={() =>
                          navigate(`/help-desk/articles/${article.id}`)
                        }
                        variant="ghost"
                        className="py-2.5 w-36"
                      >
                        See more
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Section */}
              {metaData && (
                <div className="p-4 flex items-center justify-end">
                  <Pagination
                    totalEntriesSize={metaData.totalCount}
                    currentPage={metaData.currentPage}
                    totalPages={metaData.totalPages}
                    onPageChange={setPage}
                    pageSize={pageSize}
                    onPageSizeChange={size => {
                      setPageSize(size);
                      setPage(1);
                    }}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Articles;
