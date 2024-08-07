const EntrySubmissionStatus = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  if (searchParams.status === "success")
    return <main>You have successfully submitted the form</main>;
};

export default EntrySubmissionStatus;
