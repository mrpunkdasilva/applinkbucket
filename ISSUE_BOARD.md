# LinkBucket - Issue Board

## 🏃‍♂️ Sprint Atual (Sprint 1 - MVP Core)

### ✅ Concluído
- [x] #1 Implementar autenticação JWT (Frontend Mock)
  - Frontend interface de login/registro
  - Validação de senha
  - Persistência local temporária
  - Middleware de autenticação no frontend

### 🔄 Em Progresso
- [ ] #1 Implementar autenticação JWT (Backend Integration)
  - Setup Spring Security
  - Endpoints de registro e login
  - Integração frontend-backend
  - Testes de integração

- [ ] #2 CRUD de Buckets
  - Backend endpoints
  - Frontend interface
  - Validações
  - Testes unitários

### 📋 Backlog Pronto
- [ ] #3 Sistema de Tags
  - Modelo de dados
  - API endpoints
  - UI para gerenciamento
  - Busca por tags

- [ ] #4 Compartilhamento de Links
  - Gerar links únicos
  - Página pública de visualização
  - Controle de permissões
  - Analytics básico

## 📅 Próxima Sprint (Sprint 2 - UX Enhancement)

- [ ] #5 Sistema de Busca Avançada
  - Elasticsearch integration
  - Filtros complexos
  - UI de busca
  - Cache de resultados

- [ ] #6 Chrome Extension
  - Estrutura básica
  - Integração com API
  - UI para salvar links
  - Quick actions

## 🎯 Épicos

### 🔐 Autenticação & Segurança
- [ ] #7 SSO Integration
- [ ] #8 2FA Implementation
- [ ] #9 Role-based access control
- [ ] #10 API key management

### 📊 Analytics & Métricas
- [ ] #11 User tracking setup
- [ ] #12 Dashboard básico
- [ ] #13 Relatórios de uso
- [ ] #14 Export de dados

### 🤝 Colaboração
- [ ] #15 Workspaces compartilhados
- [ ] #16 Comentários em links
- [ ] #17 Sistema de convites
- [ ] #18 Histórico de atividades

### 🔄 Integrações
- [ ] #19 GitHub Integration
- [ ] #20 Slack Bot
- [ ] #21 Discord Bot
- [ ] #22 Zapier Integration

## 🐛 Bugs & Tech Debt

### Alta Prioridade
- [ ] #23 Otimizar queries de busca
- [ ] #24 Implementar cache Redis
- [ ] #25 Melhorar cobertura de testes

### Média Prioridade
- [ ] #26 Refatorar componentes React
- [ ] #27 Atualizar dependências
- [ ] #28 Documentação API

## 🚀 Features Futuras (Backlog)

### Q2 2024
- [ ] #29 API pública
- [ ] #30 Mobile PWA
- [ ] #31 Import/Export
- [ ] #32 Bulk operations

### Q3 2024
- [ ] #33 AI tagging
- [ ] #34 Recomendações
- [ ] #35 Analytics avançado
- [ ] #36 Team dashboard

## 📋 Critérios de Aceitação Globais

### Qualidade
- Cobertura de testes > 80%
- Zero vulnerabilidades críticas
- Performance adequada (< 2s load time)
- Responsivo em todos dispositivos

### UX/UI
- Design system consistente
- Acessibilidade WCAG 2.1
- Suporte i18n
- Feedback visual claro

### Técnico
- CI/CD automatizado
- Logs estruturados
- Monitoramento
- Backup automático

## 🎯 Métricas de Sucesso

### Sprint
- Velocidade do time
- Bugs reportados
- Tech debt ratio
- Deploy frequency

### Produto
- User engagement
- Retention rate
- Conversion rate
- NPS score

## 📝 Notas

### Convenções de Código
- ESLint + Prettier config
- Conventional Commits
- PR template
- Code review checklist

### Stack Técnico
- Frontend: React + TypeScript
- Backend: Spring Boot
- DB: PostgreSQL
- Cache: Redis
- Search: Elasticsearch