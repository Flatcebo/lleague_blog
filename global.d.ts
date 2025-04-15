interface Props {
  params: Promise<{
    id?: string;
  }>;
  searchParams: Promise<{
    id?: string;
    post?: string;
    page?: string;
    category_id?: string;
    refresh?: string;
    access?: string;
  }>;
}

interface CookieProps {
  access: string;
  refresh: string;
}

interface PostProps {
  id: number;
  main_image: string;
  sub_image: string;
  title: string;
  content: string;
  category: {
    id: number;
    name: string;
  };
  views: number;
  created_at: Date;
}

interface UploadFileProps {
  files: File[];
  access: string;
}

type PostFormState = {
  title: string;
  category: number;
  desc: string;
  agree: boolean;
};
