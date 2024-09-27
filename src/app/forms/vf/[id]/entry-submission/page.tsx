const EntrySubmissionStatus = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  if (searchParams.status === "success")
    return <div>You have successfully submitted the form</div>;
};

export default EntrySubmissionStatus;
