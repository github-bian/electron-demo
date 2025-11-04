# 最佳实践

本文档包含了在这个项目中开发时应遵循的最佳实践。

## 🏗️ 代码组织

### 目录结构

```
src/
├── app/              # Next.js 页面
├── components/       # 可复用组件
│   ├── ui/          # 基础 UI 组件
│   ├── features/    # 功能组件
│   └── layouts/     # 布局组件
├── lib/             # 工具函数
├── hooks/           # 自定义 Hooks
├── providers/       # Context Providers
├── styles/          # 全局样式
└── types/           # 类型定义
```

### 文件命名

- **组件文件**: PascalCase，如 `Button.tsx`
- **工具文件**: camelCase，如 `formatDate.ts`
- **类型文件**: camelCase，如 `user.types.ts`
- **常量文件**: UPPER_CASE，如 `API_CONSTANTS.ts`

## 📝 TypeScript 最佳实践

### 1. 严格类型定义

```typescript
// ✅ 好的实践
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
}

function getUser(id: number): Promise<User> {
  // ...
}

// ❌ 避免使用 any
function getData(): any {
  // ...
}
```

### 2. 使用类型守卫

```typescript
function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value
  );
}

// 使用
if (isUser(data)) {
  console.log(data.name); // 类型安全
}
```

### 3. 泛型使用

```typescript
// 可复用的 API 调用函数
async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  return response.json() as T;
}

// 使用
const users = await fetchData<User[]>('/api/users');
```

### 4. 联合类型和交叉类型

```typescript
// 联合类型
type Status = 'pending' | 'success' | 'error';

// 交叉类型
type UserWithRole = User & { role: string };
```

## ⚛️ React 最佳实践

### 1. 组件设计原则

```typescript
// ✅ 单一职责
function UserAvatar({ user }: { user: User }) {
  return <img src={user.avatar} alt={user.name} />;
}

function UserName({ user }: { user: User }) {
  return <span>{user.name}</span>;
}

// ❌ 过于复杂
function UserCard({ user }: { user: User }) {
  // 100+ 行代码
}
```

### 2. Props 类型定义

```typescript
// ✅ 使用 interface
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  children: React.ReactNode;
}

function Button({ variant = 'primary', size = 'medium', onClick, children }: ButtonProps) {
  return (
    <button className={`btn-${variant} btn-${size}`} onClick={onClick}>
      {children}
    </button>
  );
}
```

### 3. 自定义 Hooks

```typescript
// 提取可复用逻辑
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

// 使用
const [theme, setTheme] = useLocalStorage('theme', 'light');
```

### 4. 性能优化

```typescript
// 使用 React.memo
const UserCard = React.memo(({ user }: { user: User }) => {
  return <div>{user.name}</div>;
});

// 使用 useMemo
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);

// 使用 useCallback
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
```

### 5. 条件渲染

```typescript
// ✅ 简洁的条件渲染
{isLoading && <Spinner />}
{error && <ErrorMessage error={error} />}
{data?.length > 0 && <UserList users={data} />}

// ✅ 复杂条件使用函数
function renderContent() {
  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!data) return <EmptyState />;
  return <UserList users={data} />;
}

return <div>{renderContent()}</div>;
```

## 🎨 样式最佳实践

### 1. Tailwind CSS

```typescript
// ✅ 使用语义化的类组合
<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
  按钮
</button>

// ✅ 提取重复的样式
const buttonClasses = "px-4 py-2 rounded transition";
const primaryClasses = "bg-blue-500 text-white hover:bg-blue-600";

<button className={`${buttonClasses} ${primaryClasses}`}>
  主要按钮
</button>
```

### 2. styled-components

```typescript
// ✅ 使用 props 控制样式
const Button = styled.button<{ variant: 'primary' | 'secondary' }>`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background: ${props => props.variant === 'primary' ? '#667eea' : '#e5e7eb'};
  color: ${props => props.variant === 'primary' ? 'white' : 'black'};
  
  &:hover {
    opacity: 0.9;
  }
`;

// 使用
<Button variant="primary">主要按钮</Button>
```

### 3. 主题一致性

```typescript
// ✅ 使用主题变量
const theme = {
  colors: {
    primary: '#667eea',
    secondary: '#764ba2',
    danger: '#ef4444',
  },
  spacing: {
    sm: '0.5rem',
    md: '1rem',
    lg: '2rem',
  },
};

const Button = styled.button`
  background: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.md};
`;
```

## 🎬 动画最佳实践

### 1. Framer Motion 基础

```typescript
// ✅ 使用动画变体
const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

<motion.div
  variants={variants}
  initial="hidden"
  animate="visible"
  transition={{ duration: 0.5 }}
>
  内容
</motion.div>
```

### 2. 列表动画

```typescript
// ✅ 使用 AnimatePresence
<AnimatePresence>
  {items.map(item => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {item.name}
    </motion.div>
  ))}
</AnimatePresence>
```

### 3. 性能考虑

```typescript
// ✅ 使用 transform 和 opacity（GPU 加速）
<motion.div
  animate={{ x: 100, opacity: 0.5 }}
/>

// ❌ 避免动画 width、height（触发重排）
<motion.div
  animate={{ width: 300, height: 200 }}
/>
```

## 🔌 IPC 通信最佳实践

### 1. 类型安全的 IPC

```typescript
// shared/types.ts
export interface GetUserRequest {
  id: number;
}

export interface GetUserResponse {
  user: User;
}

// main/ipc.ts
ipcMain.handle('getUser', async (_, request: GetUserRequest): Promise<GetUserResponse> => {
  const user = await fetchUser(request.id);
  return { user };
});

// renderer
const response = await window.electronAPI.getUser({ id: 1 });
console.log(response.user);
```

### 2. 错误处理

```typescript
// ✅ 统一的错误处理
async function handleIPC<T>(handler: () => Promise<T>): Promise<IPCResponse<T>> {
  try {
    const data = await handler();
    return { success: true, data };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

// 使用
ipcMain.handle('saveFile', async (_, content) => {
  return handleIPC(async () => {
    await fs.writeFile('file.txt', content);
    return { saved: true };
  });
});
```

### 3. 输入验证

```typescript
// ✅ 验证 IPC 输入
function validateUserId(id: unknown): number {
  if (typeof id !== 'number' || id <= 0) {
    throw new Error('Invalid user ID');
  }
  return id;
}

ipcMain.handle('getUser', async (_, id: unknown) => {
  const validId = validateUserId(id);
  // ...
});
```

## 📦 状态管理最佳实践

### 1. Context 使用

```typescript
// ✅ 拆分 Context
// UserContext.tsx
const UserContext = createContext<UserContextType>();

export function UserProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// SettingsContext.tsx
const SettingsContext = createContext<SettingsContextType>();
// ...

// 使用
<UserProvider>
  <SettingsProvider>
    <App />
  </SettingsProvider>
</UserProvider>
```

### 2. 状态组合

```typescript
// ✅ 使用 useReducer 管理复杂状态
type State = {
  data: User[];
  isLoading: boolean;
  error: string | null;
};

type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: User[] }
  | { type: 'FETCH_ERROR'; payload: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, isLoading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, isLoading: false, data: action.payload };
    case 'FETCH_ERROR':
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
}
```

## 🧪 测试最佳实践

### 1. 组件测试

```typescript
// UserCard.test.tsx
import { render, screen } from '@testing-library/react';
import UserCard from './UserCard';

describe('UserCard', () => {
  it('renders user name', () => {
    const user = { id: 1, name: 'John' };
    render(<UserCard user={user} />);
    expect(screen.getByText('John')).toBeInTheDocument();
  });
});
```

### 2. Hook 测试

```typescript
// useLocalStorage.test.ts
import { renderHook, act } from '@testing-library/react';
import useLocalStorage from './useLocalStorage';

describe('useLocalStorage', () => {
  it('stores value in localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'initial'));
    
    act(() => {
      result.current[1]('new value');
    });
    
    expect(result.current[0]).toBe('new value');
  });
});
```

## 🔒 安全最佳实践

### 1. XSS 防护

```typescript
// ✅ 使用 React 的自动转义
<div>{userInput}</div>

// ❌ 避免使用 dangerouslySetInnerHTML
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ 如果必须使用，先清理
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userInput) }} />
```

### 2. 敏感数据处理

```typescript
// ✅ 不在渲染进程存储敏感数据
// 使用主进程的 safeStorage API
ipcMain.handle('storePassword', async (_, password) => {
  const encrypted = safeStorage.encryptString(password);
  // 存储 encrypted
});
```

## 📊 性能最佳实践

### 1. 图片优化

```typescript
// ✅ 使用适当的图片格式和大小
<img 
  src="/images/avatar.webp" 
  alt="Avatar" 
  width={100} 
  height={100}
  loading="lazy"
/>
```

### 2. 代码分割

```typescript
// ✅ 动态导入大型组件
const HeavyChart = lazy(() => import('./HeavyChart'));

function Dashboard() {
  return (
    <Suspense fallback={<Spinner />}>
      <HeavyChart data={data} />
    </Suspense>
  );
}
```

### 3. 避免不必要的重渲染

```typescript
// ✅ 使用 key 优化列表
{items.map(item => (
  <UserCard key={item.id} user={item} />
))}

// ✅ 使用稳定的回调
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
```

## 📚 文档最佳实践

### 1. 组件文档

```typescript
/**
 * 用户卡片组件
 * 
 * @example
 * ```tsx
 * <UserCard 
 *   user={user} 
 *   onEdit={handleEdit}
 * />
 * ```
 */
interface UserCardProps {
  /** 用户数据 */
  user: User;
  /** 编辑回调 */
  onEdit?: (user: User) => void;
}

export function UserCard({ user, onEdit }: UserCardProps) {
  // ...
}
```

### 2. 函数文档

```typescript
/**
 * 格式化日期
 * @param date - 要格式化的日期
 * @param format - 格式字符串，默认 'YYYY-MM-DD'
 * @returns 格式化后的日期字符串
 */
export function formatDate(date: Date, format = 'YYYY-MM-DD'): string {
  // ...
}
```

---

遵循这些最佳实践将帮助你构建**可维护**、**高性能**、**安全**的 Electron 应用！
