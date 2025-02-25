import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Tarefa from '../../models/Tarefa'
import * as enums from '../../utils/enums/Tarefa'

// Recupera tarefas do LocalStorage ao iniciar
const tarefasSalvas = localStorage.getItem('tarefas')
const tarefasIniciais: Tarefa[] = tarefasSalvas
  ? JSON.parse(tarefasSalvas)
  : [
      {
        id: 1,
        descricao: 'Estudar JavaScript revendo o exercício do módulo 7',
        prioridade: enums.Prioridade.NORMAL,
        status: enums.Status.CONCLUIDA,
        titulo: 'Estudar JavaScript'
      },
      {
        id: 2,
        descricao: 'Estudar material de apoio',
        prioridade: enums.Prioridade.NORMAL,
        status: enums.Status.PENDENTE,
        titulo: 'Estudar TypeScript'
      },
      {
        id: 3,
        descricao: 'Praticar a construção de uma landing page',
        prioridade: enums.Prioridade.IMPORTANTE,
        status: enums.Status.PENDENTE,
        titulo: 'Estudar Bootstrap'
      }
    ]

type TarefasState = {
  itens: Tarefa[]
}

const initialState: TarefasState = {
  itens: tarefasIniciais
}

const tarefasSlice = createSlice({
  name: 'tarefas',
  initialState,
  reducers: {
    remover: (state, action: PayloadAction<number>) => {
      state.itens = state.itens.filter((tarefa) => tarefa.id !== action.payload)
      localStorage.setItem('tarefas', JSON.stringify(state.itens)) // Atualiza LocalStorage
    },
    editar: (state, action: PayloadAction<Tarefa>) => {
      const indexDaTarefa = state.itens.findIndex(
        (t) => t.id === action.payload.id
      )
      if (indexDaTarefa >= 0) {
        state.itens[indexDaTarefa] = action.payload
        localStorage.setItem('tarefas', JSON.stringify(state.itens)) // Atualiza LocalStorage
      }
    },
    cadastrar: (state, action: PayloadAction<Omit<Tarefa, 'id'>>) => {
      const tarefaJaExiste = state.itens.find(
        (tarefa) =>
          tarefa.titulo.toLowerCase() === action.payload.titulo.toLowerCase()
      )

      if (tarefaJaExiste) {
        alert('Já existe uma tarefa com esse nome')
      } else {
        const ultimaTarefa = state.itens[state.itens.length - 1]
        const tarefaNova = {
          ...action.payload,
          id: ultimaTarefa ? ultimaTarefa.id + 1 : 1
        }
        state.itens.push(tarefaNova)
        localStorage.setItem('tarefas', JSON.stringify(state.itens)) // Salva no LocalStorage
      }
    },
    alteraStatus: (
      state,
      action: PayloadAction<{ id: number; finalizado: boolean }>
    ) => {
      const indexDaTarefa = state.itens.findIndex(
        (t) => t.id === action.payload.id
      )
      if (indexDaTarefa >= 0) {
        state.itens[indexDaTarefa].status = action.payload.finalizado
          ? enums.Status.CONCLUIDA
          : enums.Status.PENDENTE
        localStorage.setItem('tarefas', JSON.stringify(state.itens)) // Atualiza LocalStorage
      }
    }
  }
})

export const { remover, editar, cadastrar, alteraStatus } = tarefasSlice.actions

export default tarefasSlice.reducer
