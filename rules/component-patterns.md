# 组件开发模式

## shadcn/ui 组件使用

### Card 组件
```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

<Card className="backdrop-blur-sm bg-card/80">
  <CardHeader>
    <CardTitle>标题</CardTitle>
  </CardHeader>
  <CardContent>
    内容
  </CardContent>
</Card>
```

### Button 组件
```tsx
import { Button } from "@/components/ui/button"

<Button>Primary Action</Button>
<Button variant="outline">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
```

### Badge 组件
```tsx
import { Badge } from "@/components/ui/badge"

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
```

## React 组件模式

### TypeScript 接口定义
```tsx
interface ComponentProps {
  title: string;
  description?: string;
  variant?: 'default' | 'outline';
}

export function Component({ title, description, variant = 'default' }: ComponentProps) {
  // 组件实现
}
```

### 使用 cn() 处理类名
```tsx
import { cn } from "@/lib/utils"

<div className={cn(
  "base-classes",
  variant === 'outline' && "outline-classes",
  className
)} />
```

### 状态管理
```tsx
const [isOpen, setIsOpen] = useState(false)
const [data, setData] = useState<DataType[]>([])

useEffect(() => {
  // 副作用逻辑
}, [dependencies])
```

## Astro 组件模式

### Props 定义
```astro
---
interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<div class="component">
  <h2>{title}</h2>
  {description && <p>{description}</p>}
</div>
```

### GSAP 动画
```astro
<script>
  import gsap from 'gsap';

  const animate = () => {
    gsap.from('.element', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power4.out'
    });
  };

  animate();
  document.addEventListener('astro:page-load', animate);
</script>
```

## 动画模式

### Tailwind 过渡
```tsx
<button className="transition-all duration-300 hover:scale-105 active:scale-95">
  按钮
</button>
```

### Framer Motion
```tsx
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  内容
</motion.div>
```

## 可访问性

1. 使用语义化 HTML
2. 为交互元素添加 aria 属性
3. 确保键盘导航支持
4. 提供适当的 alt 文本

```tsx
<button 
  aria-label="关闭对话框"
  onClick={handleClose}
>
  <X className="w-4 h-4" />
</button>
```
