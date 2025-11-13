# Study Notes App

## Thông tin sinh viên

- **Tên:** Nguyễn Hồng Nguyên Hải
- **Mã SV:** 22IT076
- **Lớp:** 22SE1
- **Môn:** Đa Nền Tảng (3)
- **Đề:** 4 (số thứ tự 14)

## Giới thiệu

Ứng dụng ghi chú học tập (Study Notes) được xây dựng bằng React + TypeScript + Capacitor, cho phép quản lý ghi chú theo từng môn học với lưu trữ dữ liệu local và haptic feedback.

## Công nghệ sử dụng

- **Frontend:** React 18, TypeScript, Vite
- **UI Framework:** TailwindCSS
- **Mobile:** Capacitor 7
- **Plugins:**
  - @capacitor/preferences (lưu trữ dữ liệu)
  - @capacitor/haptics (phản hồi rung)
- **Icons:** Lucide React

## Tính năng chính

1. **Quản lý môn học**

   - Thêm/Sửa/Xóa môn học
   - Tùy chỉnh tên, icon và màu sắc
   - Lưu trữ persistent với Capacitor Preferences

2. **Quản lý ghi chú**

   - Thêm/Sửa/Xóa ghi chú theo môn học
   - Hiển thị theo thời gian tạo
   - Lưu trữ local storage

3. **UI/UX**
   - Mobile-first responsive design
   - Custom modals (Toast, ConfirmDialog)
   - Haptic feedback cho các thao tác
   - Animations mượt mà

## Yêu cầu hệ thống

- Node.js >= 16
- pnpm (hoặc npm/yarn)
- Android Studio (để chạy trên Android)
- JDK 17

## Hướng dẫn cài đặt

### 1. Clone project và cài đặt dependencies

```bash
cd project
pnpm install
```

### 2. Chạy development server

```bash
pnpm run dev
```

Mở trình duyệt tại: `http://localhost:5173`

### 3. Build project

```bash
pnpm run build
```

## Chạy trên Android

### 1. Sync code với Android

```bash
pnpm run build
npx cap sync android
```

### 2. Mở Android Studio

```bash
npx cap open android
```

### 3. Chạy app trên emulator hoặc thiết bị thật

- Trong Android Studio, chọn device/emulator
- Nhấn Run (Shift + F10)

## Cấu trúc project

```
src/
├── components/          # React components
│   ├── SubjectList.tsx     # Danh sách môn học
│   ├── SubjectCard.tsx     # Card môn học
│   ├── SubjectModal.tsx    # Modal thêm/sửa môn học
│   ├── NotesScreen.tsx     # Màn hình ghi chú
│   ├── NoteCard.tsx        # Card ghi chú
│   ├── NoteModal.tsx       # Modal thêm/sửa ghi chú
│   ├── Toast.tsx           # Thông báo
│   └── ConfirmDialog.tsx   # Dialog xác nhận
├── services/            # Business logic
│   └── storageService.ts   # Quản lý storage
├── types/               # TypeScript interfaces
├── data/                # Mock data
└── App.tsx              # Root component

android/                 # Android native project
```

## Capacitor Plugins đã sử dụng

### 1. Preferences (Storage)

```typescript
import { Preferences } from "@capacitor/preferences";

// Lưu dữ liệu
await Preferences.set({ key: "notes", value: JSON.stringify(data) });

// Đọc dữ liệu
const { value } = await Preferences.get({ key: "notes" });
```

### 2. Haptics (Phản hồi rung)

```typescript
import { Haptics, ImpactStyle } from "@capacitor/haptics";

// Rung nhẹ
await Haptics.impact({ style: ImpactStyle.Light });

// Rung trung bình
await Haptics.impact({ style: ImpactStyle.Medium });

// Rung mạnh
await Haptics.impact({ style: ImpactStyle.Heavy });
```

## Scripts

```bash
# Development
pnpm run dev

# Build
pnpm run build

# Preview build
pnpm run preview

# Lint
pnpm run lint

# Type check
pnpm run typecheck

# Sync with Android
npx cap sync android

# Open Android Studio
npx cap open android
```

## Lưu ý

- App sử dụng Capacitor Preferences nên dữ liệu sẽ được lưu persistent trên thiết bị
- Haptics chỉ hoạt động trên thiết bị thật, không hoạt động trên emulator
- Cần cấp quyền VIBRATE trong AndroidManifest.xml để sử dụng Haptics

## License

MIT
