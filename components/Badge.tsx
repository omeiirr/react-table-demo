const Badge = ({ content }: { content: string }) => {
  const setColorTheme = (content: string) => {
    switch (content) {
      case 'Active':
        return 'text-emerald-600 bg-emerald-200';
      case 'Invited':
        return 'text-amber-600 bg-amber-200';
      case 'Inactive':
        return 'text-red-500 bg-red-200';

      default:
        return 'text-white bg-slate-800';
    }
  };
  return (
    <p
      className={`py-[3px] pb-[5px] px-3 font-semibold  text-sm bg rounded-full w-fit text-center ${setColorTheme(
        content
      )} `}
    >
      &bull; {content}
    </p>
  );
};

export default Badge;
