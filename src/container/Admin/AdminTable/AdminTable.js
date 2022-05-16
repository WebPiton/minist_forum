import React, { Component } from 'react'
import { connect } from 'react-redux'
import classes from './AdminTable.module.css'
import Header from '../../../component/Header/Header'

class AdminTable extends Component {   

    render() {


        return (
            <div>
                <Header/>
                <div className={classes.contentAllClass}>
                    <p style={{fontSize: "25px", fontWeight: 700, textAlign: "center"}}>Таблицы</p>
                    <div className={classes.allClass}>
                        <div className={classes.allClassBlock}>
                            <h1>Органическая химия</h1>
                            <table border="1" cellpadding="4" cellspacing="0" style={{marginTop: 25, marginBottom: 25}}>
                                <tr>
                                    <th rowspan="4" style={{background: "#ffe699"}}>Основные положения органической химии</th>
                                    <th colspan="10" style={{background: "#fff2cc"}}>Особенности органических соединений</th>
                                </tr>
                                <tr>
                                    <th colSpan='10' style={{background: "#fff2cc"}}>Изомерия</th>
                                </tr>
                                <tr align="center">
                                    <th colSpan='10' style={{background: "#fff2cc"}}>Теория химического строения</th>
                                </tr>
                                <tr align="center">
                                    <th colSpan='10' style={{background: "#fff2cc"}}>Классификация органических соединений. Гомологические ряды</th>
                                </tr>
                                <tr>
                                    <th rowSpan='100' style={{background: "#ffe699"}}>Основные классы органических соединений</th>
                                </tr>
                                <tr>
                                    <th rowSpan='4' style={{background: "#fff2cc"}}>Углеводороды</th>
                                </tr>
                                <tr>
                                    <th colspan='4' style={{background: "#fce4d6"}}>Алифатические углеводороды</th>
                                    <tr>
                                        <th style={{background: "#f8cbad"}}>Алканы</th>
                                    </tr>
                                    <tr>
                                        <th style={{background: "#f8cbad"}}>Алкены</th>
                                    </tr>
                                    <tr>
                                        <th style={{background: "#f8cbad"}}>Алкины</th>
                                    </tr>
                                    <tr>
                                        <th style={{background: "#f8cbad"}}>Алкадиены</th>
                                    </tr>
                                </tr>
                                <tr>
                                    <th colspan='4' style={{background: "#fce4d6"}}>Циклические углеводороды</th>
                                    <th style={{background: "#f8cbad"}}>Циклоалканы</th>
                                </tr>
                                <tr>
                                    <th colspan='4' style={{background: "#fce4d6"}}>Ароматические углеводороды</th>
                                    <th style={{background: "#f8cbad"}}>Арены</th>
                                </tr>
                                <tr>
                                    <th rowSpan="7" style={{background: "#fff2cc"}}>Функциональные производные углеводородов</th>
                                </tr>
                                <tr>
                                    <th colspan='10' style={{background: "#f8cbad"}}>Галогенопроизводные</th>
                                </tr>
                                <tr>
                                    <th colspan='10' style={{background: "#f8cbad"}}>Гидроксильные производные</th>
                                </tr>
                                <tr>
                                    <th colspan='10' style={{background: "#f8cbad"}}>Карбонильные соединения</th>
                                </tr>
                                <tr>
                                    <th colspan="4" style={{background: "#fce4d6"}}>Карбоновые кислоты и их производные</th>
                                    <tr>
                                        <th style={{background: "#f8cbad"}}>Одноосновные кислоты</th>
                                    </tr>
                                    <tr>
                                        <th style={{background: "#f8cbad"}}>Многоосновные кислоты</th>
                                    </tr>
                                </tr>
                                <tr>
                                    <th colspan='4' style={{background: "#fce4d6"}}>Эфиры</th>
                                    <tr>
                                        <th style={{background: "#f8cbad"}}>Простые эфиры</th>
                                    </tr>
                                    <tr>
                                        <th style={{background: "#f8cbad"}}>Сложные эфиры</th>
                                    </tr>
                                </tr>
                                <tr>
                                    <th colspan='10' style={{background: "#f8cbad"}}>Азотосодержащие</th>
                                </tr>
                                <tr>
                                    <th rowspan='4' style={{background: "#fff2cc"}}>Бифункциональные соединения</th>
                                </tr>
                                <tr>
                                    <th colspan='4' style={{background: "#fce4d6"}}>Углеводы</th>
                                    <tr>
                                        <th colspan='10' style={{background: "#f8cbad"}}>Моносахариды</th>
                                    </tr>
                                    <tr>
                                        <th colspan='10' style={{background: "#f8cbad"}}>Дисахариды</th>
                                    </tr>
                                    <tr>
                                        <th colspan='10' style={{background: "#f8cbad"}}>Полисахариды</th>
                                    </tr>
                                </tr>
                                <tr>
                                    <th colspan='5' style={{background: "#f8cbad"}}>Белки</th>
                                </tr>
                                <tr>
                                    <th colspan="5" style={{background: "#f8cbad"}}>Аминокислоты</th>
                                </tr>
                            </table>
                            <h1>Неорганическая химия</h1>
                            <table border="1" cellpadding="4" cellspacing="0" style={{marginTop: 25, marginBottom: 25}}>
                                <tr>
                                    <th rowSpan='6' style={{background: "#ffe699"}}>Важнейшие классы неорганических соединений</th>
                                </tr>
                                <tr>
                                    <th colspan='3' style={{background: "#fff2cc"}}>Осксиды</th>
                                </tr>
                                 <tr>
                                    <th colspan='3' style={{background: "#fff2cc"}}>Кислоты</th>
                                </tr>
                                <tr>
                                    <th colspan='3' style={{background: "#fff2cc"}}>Основания</th>
                                </tr>
                                <tr>
                                    <th colspan='3' style={{background: "#fff2cc"}}>Соли</th>
                                </tr>
                                <tr>
                                    <th colspan='3' style={{background: "#fff2cc"}}>Генетическая связь между классами соединений</th>
                                </tr>
                                <tr>
                                    <th rowSpan='3' style={{background: "#ffe699"}}>Химия элементов</th>
                                </tr>
                                <tr>
                                    <th style={{background: "#fff2cc"}}>Общие свойства неметаллов</th>
                                    <tr>
                                        <th style={{background: "#fce4d6"}}>Водород. Галогены</th>
                                    </tr>
                                    <tr>
                                        <th style={{background: "#fce4d6"}}>Подгруппа кислорода</th>
                                    </tr>
                                    <tr>
                                        <th style={{background: "#fce4d6"}}>Подгруппа азота</th>
                                    </tr>
                                    <tr>
                                        <th style={{background: "#fce4d6"}}>Подгруппа углерода</th>
                                    </tr>
                                </tr>
                                <tr>
                                    <th style={{background: "#fff2cc"}}>Общие свойства металлов</th>
                                    <tr>
                                        <th style={{background: "#fce4d6"}}>Металлы главных подгрупп</th>
                                    </tr>
                                    <tr>
                                        <th style={{background: "#fce4d6"}}>Металлы побочных подгрупп</th>
                                    </tr>
                                </tr>
                            </table>
                            <h1>Химия и жизнь</h1>
                            <table border="1" cellpadding="4" cellspacing="0" style={{marginTop: 25, marginBottom: 25}}>
                                <tr>
                                    <th rowSpan='4' style={{background: "#ffe699"}}>Химическое загрязнение окружающей среды и его последствия</th>
                                </tr>
                                <tr>
                                    <th style={{background: "#fff2cc"}}>Виды загрязнений окружающей среды</th>
                                </tr>
                                <tr>
                                    <th style={{background: "#fff2cc"}}>Крупные экологические катастрофы</th>
                                </tr>
                                <tr>
                                    <th style={{background: "#fff2cc"}}>Последствия экологических катастроф</th>
                                </tr>
                                <tr>
                                    <th rowSpan='5' style={{background: "#ffe699"}}>Проблемы безопасного использования веществ и химических реакций в повседневной жизни</th>
                                </tr>
                                <tr>
                                    <th style={{background: "#fff2cc"}}>Зеленая химия - перспективы развития химической науки</th>
                                </tr>
                                <tr>
                                    <th style={{background: "#fff2cc"}}>Химия в быту</th>
                                </tr>
                                <tr>
                                    <th style={{background: "#fff2cc"}}>Техника безопасности при работе в лаборатории</th>
                                </tr>
                                <tr>
                                    <th style={{background: "#fff2cc"}}>Основы химической промышленности</th>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(state) {
    return {
      token: state.auth.token
    };
}

export default connect(mapDispatchToProps)(AdminTable)