import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/textarea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';


import './styles.css'
import api from '../../services/api';

function TeacherForm() {
    const history = useNavigate();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: '', to: '',}
    ]);

    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            { week_day: 0, from: '', to: '',}
        ]);
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const updateScheduleItems = scheduleItems.map((scheduleItem, index)=> {
            if(index === position) {
                return { ...scheduleItem, [field]: value };
            }

            return scheduleItem;
        });

        setScheduleItems(updateScheduleItems);
    }

    function handleCreateClass(e: FormEvent) {
        e.preventDefault();

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        })  .then(() => {
            alert('Cadastro realizado com sucesso!')

            history('/');
        })  .catch(() => {
            alert('Erro no cadastro!')
        })
        
        console.log({
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            scheduleItems
        })
    }

    return(
        <div id="page-teacher-form" className="container">
            <PageHeader 
                title="Estes s??o os proffys dispon??veis."
                description="O primeiro passo ?? preencher esse formul??rio de inscri????o"
            />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input 
                            name="name" 
                            label="Nome completo" 
                            value={name} 
                            onChange={(e) => { setName(e.target.value) }} 
                        />
                        <Input 
                            name="avatar" 
                            label="Avatar"
                            value={avatar} 
                            onChange={(e) => { setAvatar(e.target.value) }}
                        />
                        <Input 
                            name="whatsapp"
                            label="Whatsapp"
                            value={whatsapp} 
                            onChange={(e) => { setWhatsapp(e.target.value) }}
                        />
                        <Input
                            name="bio" 
                            label="Biografia"
                            value={bio} 
                            onChange={(e) => { setBio(e.target.value) }}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <Select 
                            name="select" 
                            label="Mat??ria"
                            value={subject}
                            onChange={(e) => { setSubject(e.target.value) }}
                            options={[
                                { value:'Artes', label: 'Artes' },
                                { value:'Bilogia', label: 'Biologia' },
                                { value:'Ci??ncias', label: 'Ci??ncias' },
                                { value:'Educa????o F??sica', label: 'Educa????o F??sica' },
                                { value: 'F??sica', label: 'F??sica' },
                                { value:'Hist??ria', label: 'Hist??ria' },
                                { value:'Matem??tica', label: 'Matem??tica' },
                                { value:'Portugu??s', label: 'Portugu??s' },
                                { value:'Qu??mica', label: 'Qu??mica' },
                            ]}
                        />

                        <Input 
                            name="cost" 
                            label="Custo da sua hora por aula" 
                            value={cost}
                            onChange={(e) => { setCost(e.target.value) }}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>
                        Hor??rios dispon??veis
                        <button type="button" onClick={addNewScheduleItem}>
                            + Novo hor??rio
                        </button>
                        </legend>

                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select 
                                        name="week_day" 
                                        label="Dia da semana"
                                        value={scheduleItem.week_day}
                                        onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                                        options={[
                                          { value:'0', label: 'Domingo' },
                                          { value:'1', label: 'Sgunda-feira' },
                                          { value:'2', label: 'Ter??a-feira' },
                                          { value:'3', label: 'Quarta-feira' },
                                          { value:'4', label: 'Quinta-feira' },
                                          { value:'5', label: 'Sexta-feira' },
                                          { value:'6', label: 'S??bado' },
                                        ]}
                                    />
                                    <Input 
                                        name="from" 
                                        label="Das" 
                                        type="time"
                                        value={scheduleItem.from} 
                                        onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                                    />
                                    <Input 
                                        name="to" 
                                        label="At??" 
                                        type="time"
                                        value={scheduleItem.to} 
                                        onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                                    />
                            </div>
                            )
                        })}     
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante" />
                            Importante!<br />
                            Preencha todos os dados
                        </p>
                        <button type="submit">
                            Salvar cadastro
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm;