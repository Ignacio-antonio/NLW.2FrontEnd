import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

export interface Teacher {
     id: number;
     subject: string;
     cost: number;
     name: string;
     avatar: string;
     whatsapp: string;
     bio: string;
    };

interface TeacherItemProps {
    teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
    return (
        <article className="teacher-item">
                    <header>
                        <img src={teacher.avatar} alt={teacher.name} />
                        <div>
                            <strong>{teacher.name}</strong>
                            <span>{teacher.subject}</span>
                        </div>
                    </header>

                    <p>{teacher.bio}</p>

                    <footer>
                        <p>
                            Preço/Hora
                            <strong>R$ {teacher.cost}</strong>
                        </p>
                        <a href={'https://wa.me/${teacher.whatsapp}'}>
                            <img src={whatsappIcon} alt="Whatsapp" />
                            Entrar em contato
                        </a>
                    </footer>
                </article>
    )
}

export default TeacherItem;