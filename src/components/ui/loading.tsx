import PropagateLoader from 'react-spinners/PropagateLoader';
export const Loader = ({ height }: { height?: string }) => {
  return (
    <div
      className={`${
        height ?? 'h-[55vh]'
      } w-full flex items-center justify-center`}
    >
      <PropagateLoader
        color={'#0086F2'}
        loading={true}
        cssOverride={{
          display: 'block',
          margin: '0 auto',
          borderColor: '#0086F2',
        }}
        aria-label="Loading Spinner"
      />
    </div>
  );
};
