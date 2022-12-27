import { GetServerSideProps } from "next";

export default function Home({ data }: { data: string }) {
  return <div>{data}</div>;
}

export const getServerSideProps: GetServerSideProps<{
  data: string;
}> = async () => ({
  props: { data: "Site Navigation" },
});
