import "@vime/core/themes/default.css";

import {
  CaretRight,
  DiscordLogo,
  FileArrowDown,
  Lightning,
} from "phosphor-react";
import { DefaultUi, Player, Youtube } from "@vime/react";
import { gql, useQuery } from "@apollo/client";

const GET_LESSON_BY_SLUG_QUERY = gql`
  query GetLessonBySlug($slug: String) {
    lesson(where: { slug: $slug }) {
      title
      videoId
      description
      teacher {
        bio
        avatarURL
        name
      }
    }
  }
`;

interface GetLessonsBySlugResponse {
  lesson: {
    title: string;
    videoId: string;
    description: string;
    teacher: {
      bio: string;
      avatarURL: string;
      name: string;
    };
  };
}

interface VideoProps {
  lessonSlug: string;
}

export function Video(props: VideoProps) {
  const { data } = useQuery<GetLessonsBySlugResponse>(
    GET_LESSON_BY_SLUG_QUERY,
    {
      variables: {
        slug: props.lessonSlug,
      },
    }
  );

  console.log(data);

  if (!data) {
    return (
      <div className="flex-1">
        <p>carregando...</p>
      </div>
    );
  }

  return (
    <div className="event__video">
      <div className="video__wrapper">
        <div className="video__bg">
          <Player>
            <Youtube videoId={data.lesson.videoId} key={data?.lesson.videoId} />
            <DefaultUi />
          </Player>
        </div>
      </div>

      <div className="content__wrapper">
        <div className="content__main">
          <div className="content__info">
            <h1 className="content__title">{data?.lesson.title}</h1>
            <p className="content__paragraph">{data?.lesson.description}</p>
            <div className="flex items-center gap-4 mt-6">
              <img
                className="h-16 w-16 rounded-full border-2 border-blue-500"
                src="https://github.com/heydoughenrique.png"
                alt=""
              />

              <div className="leading-relaxed">
                <strong className="font-bold text-2xl block">
                  Douglas Henrique
                </strong>
                <span className="text-gray-200 text-sm block">
                  {data?.lesson.teacher.bio}
                </span>
              </div>
            </div>
          </div>

          <div className="content__buttons">
            <a href="" className="btn btn--green">
              <DiscordLogo size={24} />
              Comunidade do Discord
            </a>

            <a href="" className="btn btn--outline--blue">
              <Lightning size={24} />
              Comunidade do Discord
            </a>
          </div>
        </div>

        <div className="content__materials gap-8 mt-20 grid grid-cols-2 ">
          <a
            href=""
            className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors"
          >
            <div className="bg-green-700 h-full p-6 flex items-center">
              <FileArrowDown size={40} />
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">Material Complementar</strong>
              <p className="text-sm text-gray-200 mt-2">
                Acesse o material complementar para acelerar o seu
                desenvolvimento
              </p>
            </div>
            <div className="h-full p-6 flex items-center">
              <CaretRight size={24} />
            </div>
          </a>

          <a
            href=""
            className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors"
          >
            <div className="bg-green-700 h-full p-6 flex items-center">
              <FileArrowDown size={40} />
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">Wallpapers Exclusivos</strong>
              <p className="text-sm text-gray-200 mt-2">
                Baixe wallpapers exclusivos do Ignite Lab e personalize a sua
                máquina
              </p>
            </div>
            <div className="h-full p-6 flex items-center">
              <CaretRight size={24} />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
