import { useState } from "react";
import Container from "react-bootstrap/Container";
import { Button, Stack } from 'react-bootstrap'
import './App.css'

import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetContext";
import BudgetCard from "./Components/BudgetCard";
import AddBudgetModal from './Components/AddBudgetModal'
import AddExpenseModal from "./Components/AddExpenseModal";
import ViewExpensesModal from "./Components/ViewExpensesModal";
import UncategorizedBudgetCard from "./Components/UncategorizedBudgetCard";
import TotalBudgetCard from "./Components/TotalBudgetCard";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  const { budgets, getBudgetExpenses } = useBudgets()

  const openAddExpenseModal = (budgetId) => {
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }

  return (
    <>
      <Container>
        <Stack direction='horizontal' gap='2' className='mb-4'>
          <h1 className="me-auto">Presupuestos</h1>
          <Button variant='primary' onClick={() => setShowAddBudgetModal(true)} >Añadir Presupuesto</Button>
          <Button variant='outline-primary' onClick={() => openAddExpenseModal()}>Añadir Gasto</Button>
        </Stack>
        <div className="grid">
          {
            budgets.map(budget => {
              const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0)
              return (
                < BudgetCard
                  key={budget.id}
                  name={budget.name}
                  amount={amount}
                  max={budget.max}
                  onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                  onViewExpensesClick={() => setViewExpensesModalBudgetId(budget.id)}
                />
              )
            })
          }
          <UncategorizedBudgetCard
            onAddExpenseClick={openAddExpenseModal}
            onViewExpensesClick={() => setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}
          />
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)}
      />
      <ViewExpensesModal
        budgetId={viewExpensesModalBudgetId}
        handleClose={() => setViewExpensesModalBudgetId()}
      />
    </>
  );
}

export default App;
