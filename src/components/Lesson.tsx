import { CheckCircle, Lock } from "phosphor-react";
import { Link, useParams } from "react-router-dom";
import { format, isPast } from "date-fns";

import ptBR from "date-fns/locale/pt-BR/index.js";

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: "live" | "class";
}

export function Lesson(props: LessonProps) {
  const { slug } = useParams<{ slug: string }>();
  const isLessonAvailable = isPast(props.availableAt);
  const availableDateFormatted = format(
    props.availableAt,
    "EEEE' • 'd' de 'MMMM' • 'k'h'mm",

    { locale: ptBR }
  );

  const isActiveLesson = slug === props.slug;

  return (
    <>
      <Link to={`/event/lesson/${props.slug}`} className="group">
        <span className="lesson__date">{availableDateFormatted}</span>

        <div
          className={`lesson__wrapper ${isActiveLesson ? "bg-green-500" : ""}`}
        >
          <header className="lesson__content">
            {isLessonAvailable ? (
              <span className="lesson__status--available">
                <CheckCircle size={20} />
                Conteúdo Liberado
              </span>
            ) : (
              <span className="lesson__status--locked">
                <Lock size={20} />
                Em breve
              </span>
            )}
            <span className="lesson__type">
              {props.type === "live" ? "AO VIVO" : "AULA PRÁTICA"}
            </span>
          </header>
          <strong className="lesson__title">{props.title}</strong>
        </div>
      </Link>
    </>
  );
}
