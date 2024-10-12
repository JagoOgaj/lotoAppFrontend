```mermaid
classDiagram

class AppComponent{
            +title: string
            
        }
class AuthInterceptor{
            -isRefreshing: boolean
-refreshTokenSubject: BehaviorSubject~any~
-authService: AuthService
-router: Router
-tokenExpirationGuard: TokenExpirationGuard
            +intercept() Observable~HttpEvent~any~~
        }
HttpInterceptor<|..AuthInterceptor
class HttpRequestInterceptor{
            -spinner: NgxSpinnerService
-toastr: ToastrService
            +intercept() Observable~HttpEvent~any~~
        }
HttpInterceptor<|..HttpRequestInterceptor
class StatusOption {
            <<interface>>
            +label: string
+value: string
            
        }
class TirageStatus {
        <<enumeration>>
        EN_COUR
EN_VALIDATION
TERMINE
SIMULATION
SIMULATION_TERMINE
      }
class AuthService{
            -router: Router
-TOKEN_KEY: "access_token"
-REFRESH_TOKEN_KEY: "refresh_token"
-USER_ROLE_KEY: "userRole"
-http: HttpClient
-isRevoking: boolean
            +getToken() string
+getRefreshToken() string
+setTokens() void
+setAccesToken() void
+clearTokens() void
+logout() Observable~any~
+getUserRole() string
+clearUserRole() void
+setUserRole() Observable~RoleResponse~
+isAuthenticated() boolean
+refreshToken() Observable~any~
+revokeAccessToken() Observable~any~
+revokeRefreshToken() Observable~any~
        }
class RedirectAdminAuthGuard{
            -authService: AuthService
-router: Router
            +canActivate() boolean
        }
CanActivate<|..RedirectAdminAuthGuard
class RedirectUserAuthGuard{
            -authService: AuthService
-router: Router
            +canActivate() boolean
        }
CanActivate<|..RedirectUserAuthGuard
class TokenExpirationGuard{
            -canAccess: boolean
-router: Router
-authService: AuthService
            +canActivate() boolean
+enableAccess() void
        }
CanActivate<|..TokenExpirationGuard
class ContactComponent{
            +pageState: string
            
        }
class DrawComponent{
            -activatedRoute: ActivatedRoute
+pageState: string
+tirageOverview: LotteryOverviewResponse
+results: LotteryResultReponse
+tirageRank: LotteryInfoRankResponse
-drawService: DrawService
            +ngOnInit() void
+loadTirageOverview() void
        }
OnInit<|..DrawComponent
class HomePageComponent{
            +pageState: string
            +ngOnInit() void
        }
OnInit<|..HomePageComponent
class LoginRegisterPageComponent{
            +pageState: string
+activeTab: string
            +ngOnInit() void
+selectTab() void
+changeTab() void
        }
OnInit<|..LoginRegisterPageComponent
class TokenExpirationComponent{
            -authService: AuthService
-router: Router
-toastr: ToastrService
            +onRefreshToken() void
+onLogout() void
        }
class UserPageComponent{
            +pageState: string
+userInfo: UserInfoRessource
-userService: UserPageServiceService
-authService: AuthService
-router: Router
            +ngOnInit() void
+loadUserInfo() void
+logout() void
+getFullNameUser() string
        }
OnInit<|..UserPageComponent
class ContactFormComponent{
            +contactForm: FormGroup~any~
-fb: FormBuilder
-contactService: ContactFormService
-route: Router
            +ngOnInit() void
+onSubmit() void
        }
OnInit<|..ContactFormComponent
class FooterSharedComponent{
            
            
        }
class HeroSharedComponent{
            
            
        }
class LoginFormComponent{
            +tabChange: EventEmitter~string~
+loginForm: FormGroup~any~
+serverErrors: LoginErrors
-fb: FormBuilder
-loginService: UserLoginService
-router: Router
-authService: AuthService
            +ngOnInit() void
+onSubmit() void
+onTabChange() void
        }
OnInit<|..LoginFormComponent
class LottoryFormComponent{
            +idTirrage: number
+registryLotteryForm: FormGroup~any~
+backendErrors: LotteryRegistryError
-fb: FormBuilder
-registryLotteryService: LottoryFormService
-userPlayService: UserPlayServiceService
-userSharedService: UserSharedService
            +ngOnInit() void
+submitForm() void
+handleBackendErrors() void
        }
OnInit<|..LottoryFormComponent
class NavbarSharedComponent{
            -route: Router
+pageState: string
+isScrolled: boolean
+needBg: boolean
            +ngOnInit() void
+onWindowScroll() void
+redirectTo() void
        }
OnInit<|..NavbarSharedComponent
class RegisterFormComponent{
            +tabChange: EventEmitter~string~
+registryForm: FormGroup~any~
+serverErrors: RegistryErrors
-fb: FormBuilder
-registerService: UserRegistryService
-router: Router
-authService: AuthService
            +ngOnInit() void
+onSubmit() void
+onTabChange() void
        }
OnInit<|..RegisterFormComponent
class CreateTirageRessource {
            <<interface>>
            +name: string
+start_date?: string
+end_date?: string
+reward_price: number
+status: string
+max_participants: number
            
        }
class CreateTirageResponse {
            <<interface>>
            +message: string
            
        }
class CreateTirageError {
        <<interface>>
        +message: string
        +errors: boolean
        +details: { 
            [key: string]: any; 
            name?: string[]; 
            status?: string[]; 
            max_participants?: string[]; 
            reward_price?: string[]; 
            start_date?: string[]; 
            end_date?: string[];
        }
    }
class DeleteTirageResponse {
            <<interface>>
            +message: string
            
        }
class DeleteTirageError {
            <<interface>>
            +message: string
+errors: boolean
+details?: string
            
        }
class AdminInfoResponse {
            <<interface>>
            +first_name: string
+last_name: string
+email: string
            
        }
class AdminInfoErrors {
            <<interface>>
            +errors: boolean
+message: string
+details?: { [key: string]: any; }
            
        }
class AdminLogoutResponse {
            <<interface>>
            +message: string
            
        }
class AdminLogoutError {
            <<interface>>
            +errors: boolean
+message: string
+details: string
            
        }
class LoginAdminData {
            <<interface>>
            +email: string
+password: string
            
        }
class LoginAdminResponse {
            <<interface>>
            +message: string
+access_token: string
+refresh_token: string
            
        }
class LoginAdminErrors {
            <<interface>>
            +errors: boolean
+message: string
+details?: { email?: string[]; password?: string[]; emailError?: string; passwordError?: string; }
            
        }
class ManageRemoveParticipant {
            <<interface>>
            +lottery_id: number
+user_id: number
            
        }
class RemoveParticipantResponse {
            <<interface>>
            +message: string
            
        }
class RemoveParticipantError {
            <<interface>>
            +errors: boolean
+message: string
+details?: string
            
        }
class AddParticipantRessource {
            <<interface>>
            +user_name: string
+email: string
+numbers: string
+numbers_lucky: string
            
        }
class AddParticipantsResponse {
            <<interface>>
            +message: string
+entry_id: number
            
        }
class AddParticipantsError {
            <<interface>>
            +message: string
+errors: boolean
+details?: { [key: string]: any; numbers?: string[]; lucky_numbers?: string[]; email?: string[]; user_name?: string[]; }
            
        }
class ParticipantRessource {
            <<interface>>
            +user_id: number
+user_name: string
+email: string
+numbers: string
+lucky_numbers: string
            
        }
class ParticipantsResponse {
            <<interface>>
            +message: string
+data: Participants
            
        }
class ParticipantsError {
            <<interface>>
            +message: string
+erros: boolean
+details?: string[]
            
        }
class PopulateFakeUserResponse {
            <<interface>>
            +message: string
+total_participants: number
            
        }
class UpdateInfoAdmin {
            <<interface>>
            +first_name?: string
+last_name?: string
+email?: string
            
        }
class UpdateInfoAdminResponse {
            <<interface>>
            +message: string
            
        }
class UpdateInfoAdminResponseError {
            <<interface>>
            +errors: boolean
+message: string
+details?: { [key: string]: any; first_name?: string[]; last_name?: string[]; email?: string[]; password?: string[]; }
            
        }
class UpdatePasswordAdmin {
            <<interface>>
            +old_password: string
+new_password: string
            
        }
class UpdatePassworAdmindResponse {
            <<interface>>
            +message: string
            
        }
class UpdatePasswordUAdminError {
            <<interface>>
            +errors: boolean
+message: string
+details?: { password?: string[]; new_password?: string[]; }
            
        }
class UpdatePasswordAdminError {
            <<interface>>
            +errors: boolean
+message: string
+details?: { password: string[]; new_password?: string[]; }
            
        }
class UpdateLottery {
            <<interface>>
            +name?: string
+start_date?: string
+end_date?: string
+status?: string
+max_participants?: number
            
        }
class UpdateLotteryResponse {
            <<interface>>
            +message: string
            
        }
class UpdateLotteryError {
            <<interface>>
            +message: string
+errors: boolean
+details?: { [key: string]: string[]; name?: string[]; start_date?: string[]; end_date?: string[]; status?: string[]; max_participants?: string[]; }
            
        }
class UpdateLotteryToDoneResponse {
            <<interface>>
            +message: string
            
        }
class UpdateLotteryToDoneErorr {
            <<interface>>
            +message: string
+errors: boolean
+details?: any
            
        }
class AddWiningsNumber {
            <<interface>>
            +winning_numbers: string
+lucky_numbers: string
            
        }
class LotteryInfoAdminResponse {
            <<interface>>
            +message: string
+data: LotteryOverviewResponse
+numbers?: { winning_numbers: string; lucky_numbers: string; }
            
        }
class LotteryInfoAdminErreur {
            <<interface>>
            +message: string
+errors: boolean
+details?: string
            
        }
class AllLotteryResponse {
            <<interface>>
            +message: string
+data: LotteriesOverviewResponse
            
        }
class AllLotteryError {
            <<interface>>
            +message: string
+errors: boolean
+details?: string[]
            
        }
class DrawRank {
            <<interface>>
            +rank: number
+name: string
+score: number
+winnings: number
            
        }
class AdminLotteryInfoRankResponse {
            <<interface>>
            +message: string
+data: DrawRanks
            
        }
class AdminLotteryInfoRankError {
            <<interface>>
            +message: string
+errors: boolean
+details?: string
            
        }
class RoleResponse {
            <<interface>>
            +role: string
            
        }
class Roles {
        <<enumeration>>
        ADMIN
USER
      }
class ContactUsRessource {
            <<interface>>
            +email: string
+message: string
            
        }
class ContactUsResponse {
            <<interface>>
            +message: string
            
        }
class ContactUsErrors {
            <<interface>>
            +message: string
+errors: boolean
+details: string
            
        }
class LoginData {
            <<interface>>
            +email: string
+password: string
            
        }
class LoginResponse {
            <<interface>>
            +message: string
+access_token: string
+refresh_token: string
            
        }
class LoginErrors {
            <<interface>>
            +errors: boolean
+message: string
+details?: { email?: string[]; password?: string[]; emailError?: string; passwordError?: string; }
            
        }
class LogoutUserResponse {
            <<interface>>
            +message: string
            
        }
class LogoutUserError {
            <<interface>>
            +message: string
+errors: boolean
+details: string
            
        }
class LotteryInfoResponse {
            <<interface>>
            +message: string
+data: LotteryOverviewResponse
+numbers: LotteryResultReponse
            
        }
class LotteryInfoErreur {
            <<interface>>
            +message: string
+errors: boolean
+details?: string
            
        }
class DrawRank {
            <<interface>>
            +rank: number
+name: string
+score: number
+winnings: number
            
        }
class LotteryInfoRankResponse {
            <<interface>>
            +message: string
+data: DrawRanks
+currentUser: DrawRank
            
        }
class LotteryInfoRankError {
            <<interface>>
            +message: string
+errors: boolean
+details?: string
            
        }
class LotteryRegistryResponse {
            <<interface>>
            +message: string
            
        }
class LotteryRegistryError {
            <<interface>>
            +message: string
+errors: boolean
+details?: { [key: string]: any; numbers?: string[]; lucky_numbers?: string[]; }
            
        }
class LotteryRegistryData {
            <<interface>>
            +lottery_id: number
+numbers: string
+lucky_numbers: string
            
        }
class RegistryData {
            <<interface>>
            +first_name: string
+last_name: string
+email: string
+password: string
            
        }
class RegistryResponce {
            <<interface>>
            +message: string
+access_token: string
+refresh_token: string
            
        }
class RegistryErrors {
            <<interface>>
            +errors: boolean
+message: string
+details?: { [key: string]: any; first_name?: string[]; last_name?: string[]; email?: string[]; password?: string[]; }
            
        }
class LotteryOverviewResponse {
            <<interface>>
            +id: number
+name: string
+start_date?: string
+end_date?: string
+status: string
+reward_price: number
+max_participants: number
+participant_count: number
            
        }
class LotteryResultReponse {
            <<interface>>
            +winning_numbers: string
+lucky_numbers: string
            
        }
class LotteryOverviewError {
            <<interface>>
            +errors: boolean
+message: string
            
        }
class LotteryHistory {
            <<interface>>
            +id: number
+name: string
+date: string
+statut: string
+numerosJoues: string
+numerosChance: string
+dateTirage: string
            
        }
class LotteryHistoryResonse {
            <<interface>>
            +message: string
+data: LotteryHistory[]
            
        }
class LotteryHistoryErrors {
            <<interface>>
            +message: string
+errors: boolean
+details?: string
+emptyEntries?: boolean
            
        }
class UserInfoRessource {
            <<interface>>
            +first_name: string
+last_name: string
+email: string
+notification: boolean
            
        }
class AccountInfoErrors {
            <<interface>>
            +errors: boolean
+message: string
+details?: { [key: string]: any; }
            
        }
class UpdateInfoUser {
            <<interface>>
            +first_name?: string
+last_name?: string
+email?: string
+notification?: boolean
            
        }
class UpdateInfoUserResponse {
            <<interface>>
            +message: string
            
        }
class UpdateInfoUserResponseError {
            <<interface>>
            +errors: boolean
+message: string
+details?: { [key: string]: any; first_name?: string[]; last_name?: string[]; email?: string[]; password?: string[]; }
            
        }
class UpdatePasswordUser {
            <<interface>>
            +old_password: string
+new_password: string
            
        }
class UpdatePasswordResponse {
            <<interface>>
            +message: string
            
        }
class UpdatePasswordUserError {
            <<interface>>
            +errors: boolean
+message: string
+details?: { password?: string[]; new_password?: string[]; }
            
        }
class AccountAdminComponent{
            +adminInfo: AdminInfoResponse
-adminAccountService: AcountAdminService
-authService: AuthService
            +ngOnInit() void
+loadAdminInfo() void
+getFullNameAdmin() string
+onUpdate() void
+getGreetingMessage() string
        }
OnInit<|..AccountAdminComponent
class AdminLoginComponent{
            +loginForm: FormGroup~any~
+serverErrors: LoginAdminErrors
-fb: FormBuilder
-adminLoginService: AdminLoginService
-authService: AuthService
-router: Router
            +ngOnInit() void
+onSubmit() void
+goToHome() void
        }
OnInit<|..AdminLoginComponent
class AdminMainComponent{
            +isSlideBarCollapsed: WritableSignal~boolean~
+screenWidth: WritableSignal~number~
            +ngOnInit() void
+onResize() void
+changeIsSlideBarCollapsed() void
        }
OnInit<|..AdminMainComponent
class ManageParticipantsComponent{
            -activatedRoute: ActivatedRoute
+tirage: LotteryOverviewResponse
+participants: Participants
+currentPage: number
+itemsPerPage: number
+totalPages: number
+paginatedParticipants: Participants
+searchTerm: string
+idTirage: number
-adminService: AdminSharedService
-manageParticipantsService: ManageParticipantsService
            +ngOnInit() void
+loadTirage() void
+loadParticipants() void
+onUpdate() void
        }
OnInit<|..ManageParticipantsComponent
class AdminSharedService{
            -http: HttpClient
            +getTirageDetails() Observable~LotteryInfoAdminResponse~
+updateTirage() Observable~UpdateLotteryResponse~
+updateTirageToDone() Observable~UpdateLotteryToDoneResponse~
        }
class TirageDetailsComponent{
            -activatedRoute: ActivatedRoute
+tirageOverview: LotteryOverviewResponse
+tirageId: number
+updateTirageForm: FormGroup~any~
+winningNumbersForm: FormGroup~any~
+showWinningForm: boolean
+serverErrors: UpdateLotteryError
+hasErros: boolean
+formChanged: boolean
+statusOptions: StatusOptions
+disabledEndTirage: boolean
+disabledConfirmEndTirage: boolean
+modalColapsed: boolean
+cantSumbmit: boolean
-tirageAdminService: AdminSharedService
-fb: FormBuilder
-route: Router
            +ngOnInit() void
+ngAfterContentChecked() void
+initForm() void
+loadTirageDetails() void
+showWinningNumbersForm() void
+adjustDate() string
+modalColapse() void
+getStatusOptions() StatusOptions
+checkIfFormIsChanged() void
+isInSimulation() boolean
+isDone() boolean
+viewResult() void
+saveChanges() void
+integerValidator() ValidationErrors
+hasServerError() string
+navigatToManageParticipant() void
+confirmStatus() void
        }
OnInit<|..TirageDetailsComponent
AfterContentChecked<|..TirageDetailsComponent
class TirageListComponent{
            +tirages: LotteriesOverviewResponse
+newTirage: FormGroup~any~
+showDateFields: boolean
+severErrors: CreateTirageError
-tirageListService: TirageListService
-tirageCreateService: TirageListSharedService
-fb: FormBuilder
            +ngOnInit() void
+loadTirages() void
+onUpdate() void
+onStatusChange() void
+createTirage() void
+hasServerError() string
        }
OnInit<|..TirageListComponent
class TirageResultComponent{
            +ranking: DrawRanks
+lotteryInfo: LotteryOverviewResponse
+currentPage: number
+itemsPerPage: number
+winning_numbers: string
+lucky_numbers: string
-tirageResultService: TirageResultService
-activatedRoute: ActivatedRoute
-tirageDetailsAdmin: AdminSharedService
            +ngOnInit() void
+getPaginatedPlayers() DrawRank[]
+getTotalPagesArray() number[]
+goToPage() void
+roundReward() number
+loadRank() void
+loadDetails() void
        }
OnInit<|..TirageResultComponent
class DrawService{
            -http: HttpClient
            +getTirageOverview() Observable~LotteryInfoResponse~
        }
class UserPageServiceService{
            -http: HttpClient
            +getUserInfo() Observable~UserInfoRessource~
+logoutUser() Observable~LogoutUserResponse~
        }
class AdminContentComponent{
            +isSlideBarCollapsed: InputSignal~boolean~
+screenWidth: InputSignal~number~
+sizeClass: Signal~"" | "body-trimmed" | "body-md-screen"~
            
        }
class AdminInfoComponent{
            +adminInfo: AdminInfoResponse
+updateParent: EventEmitter~void~
+adminFormInfo: FormGroup~any~
+isFormChange: boolean
+errorResponse: UpdateInfoAdminResponseError
-fb: FormBuilder
-updateService: AdminInfoService
            +ngOnInit() void
+ngOnChanges() void
+patchadminInfo() void
+checkIfFormIsChanged() void
+onSubmit() void
+getUpdatedFields() Partial~UpdateInfoAdmin~
        }
class AdminPwdComponent{
            +updateParent: EventEmitter~void~
+updateFormPassword: FormGroup~any~
+serverErrors: UpdatePasswordAdminError
-fb: FormBuilder
-updaPasswordService: AdminPwdService
            +ngOnInit() void
+passwordMatchValidator() { mismatch: boolean; }
+onSubmit() void
+getErrorMessage() string
        }
OnInit<|..AdminPwdComponent
class ParticipantsListComponent{
            +tirage: LotteryOverviewResponse
+participants: Participants
+paginatedParticipants: Participants
+searchTerm: string
+currentPage: number
+totalPages: number
+itemsPerPage: number
+updateParent: EventEmitter~void~
+newUser: FormGroup~any~
+pages: number[]
+selectedUser: ParticipantRessource
+backendErrors: AddParticipantsError
-participantsService: ParticipantsListService
-fb: FormBuilder
            +ngOnInit() void
+ngOnChanges() void
+setSelectedUser() void
+filterParticipants() void
+nextPage() void
+previousPage() void
+goToPage() void
+canAddUser() boolean
+hasParticipants() boolean
+updatePagination() void
+getVisiblePages() number[]
+isDone() boolean
+submitForm() void
+populateFakeUser() void
+hasServerErorr() string
+confirmDelete() void
        }
OnInit<|..ParticipantsListComponent
OnChanges<|..ParticipantsListComponent
class SlideBarComponent{
            +isSlideBarCollapsed: InputSignal~boolean~
+setIsSlideBarCollapsed: OutputEmitterRef~boolean~
+items: { routerLink: string; icon: string; label: string; }[]
-adminAccountService: AcountAdminService
-authService: AuthService
-router: Router
            +toggleCollapse() void
+closeSlideBar() void
+logoutAdmin() void
        }
class TirageListSharedComponent{
            +tirages: LotteriesOverviewResponse
+updateParent: EventEmitter~void~
+searchTerm: string
+currentPage: number
+itemsPerPage: number
+totalPages: number
+paginatedTirages: LotteriesOverviewResponse
+pages: number[]
+startDate: Date
+endDate: Date
+statusFilter: string
+idTirageToDelete: number
+newTirage: FormGroup~any~
+showDateFields: boolean
+severErrors: CreateTirageError
-fb: FormBuilder
-router: Router
-tirageListService: TirageListSharedService
            +ngOnInit() void
+ngOnChanges() void
+updatePagination() void
+filterTirages() void
+isStatusSimulationOrTermine() boolean
+resetFilters() void
+nextPage() void
+previousPage() void
+goToPage() void
+viewDetails() void
+renderStatusToTemplate() string
+hasServerError() string
+onStatusChange() void
+confirmDelete() void
+deleteTirage() void
+createTirage() void
        }
OnInit<|..TirageListSharedComponent
OnChanges<|..TirageListSharedComponent
class TirageOverviewComponent{
            +tirage: LotteryOverviewResponse
-router: Router
            +showDetails() void
+renderStatusToTemplate() string
        }
class ContactFormService{
            -http: HttpClient
            +sendMessgage() Observable~ContactUsResponse~
        }
class DrawOverviewComponent{
            +drawData: LotteryOverviewResponse
+name: string
+startDate: string | Date
+endDate: string | Date
+rewardPrice: number
+participantCount: number
            +ngOnInit() void
        }
class DrawRankComponent{
            +players: DrawRanks
+currentUser: DrawRank
+currentPage: number
+itemsPerPage: number
-activatedRoute: ActivatedRoute
-drawRankService: DrawRankService
            +ngOnInit() void
+getPaginatedPlayers() DrawRank[]
+getTotalPagesArray() number[]
+goToPage() void
+isCurrentUserOnCurrentPage() boolean
+roundReward() number
+loadRank() void
        }
OnInit<|..DrawRankComponent
class UserLoginService{
            -http: HttpClient
            +login() Observable~LoginResponse~
        }
class LottoryFormService{
            -http: HttpClient
            +registryToLottery() Observable~LotteryRegistryResponse~
        }
class UserRegistryService{
            -http: HttpClient
            +registry() Observable~RegistryResponce~
        }
class CountdownTimerComponent{
            +launchDate?: Date
-subscription: Subscription
+days: number
+hours: number
+minutes: number
+seconds: number
            +ngOnInit() void
+updateValues() void
+ngOnDestroy() void
        }
OnInit<|..CountdownTimerComponent
OnDestroy<|..CountdownTimerComponent
class CountdownTimerCardComponent{
            +value: number
+label: string
+previousValue: number
            +ngOnInit() void
        }
OnInit<|..CountdownTimerCardComponent
class UserSharedService{
            -lotteryUpdateSource: Subject~void~
+lotteryUpdate$: Observable~void~
            +notifyLotteryUpdate() void
        }
class UserHistoryComponent{
            +parties: any[]
+paginatedParties: LotteryHistories
+currentPage: number
+itemsPerPage: number
+totalPages: number
+pages: number[]
+histories: LotteryHistories
-userHistoryService: UserHistoryService
-router: Router
-userSharedService: UserSharedService
            +ngOnInit() void
+goToPage() void
+paginate() void
+renderStatusToTemplate() string
+canShowDetails() boolean
+tirageIsDone() boolean
+tirageIsInValidation() boolean
+tirageIsInCurrent() boolean
+voirDetailsTirage() void
+loadHistories() void
+updatePagination() void
        }
OnInit<|..UserHistoryComponent
class UserInformationsComponent{
            +userInfo: UserInfoRessource
+userFormInfo: FormGroup~any~
+isFormChange: boolean
+errorResponse: UpdateInfoUserResponseError
-fb: FormBuilder
-updateService: UserUpdateService
            +ngOnInit() void
+ngOnChanges() void
+patchUserInfo() void
+checkIfFormIsChanged() void
+onSubmit() void
+getUpdatedFields() Partial~UserInfoRessource~
        }
OnInit<|..UserInformationsComponent
class UserPasswordComponent{
            +updateFormPassword: FormGroup~any~
+serverErrors: UpdatePasswordUserError
-fb: FormBuilder
-updatePasswordService: UserUpdatePasswordService
            +ngOnInit() void
+passwordsMatchValidator() { mismatch: boolean; }
+onSubmit() void
+getErrorMessage() string
        }
OnInit<|..UserPasswordComponent
class UserPlayComponent{
            +endDate: Date
+curentTirage: LotteryOverviewResponse
+error: LotteryOverviewError
-userPlayService: UserPlayServiceService
-userSharedService: UserSharedService
-userHistoryService: UserHistoryService
-route: Router
            +ngOnInit() void
+loadCurenTirage() void
+loadUserHistories() void
        }
OnInit<|..UserPlayComponent
class AcountAdminService{
            -http: HttpClient
            +getAdminInfo() Observable~AdminInfoResponse~
+logout() Observable~AdminLogoutResponse~
        }
class AdminLoginService{
            -http: HttpClient
            +loginAdmin() Observable~LoginAdminResponse~
        }
class ManageParticipantsService{
            -http: HttpClient
            +getParticipants() Observable~ParticipantsResponse~
        }
class TirageListService{
            -http: HttpClient
            +getTirageList() Observable~AllLotteryResponse~
        }
class TirageResultService{
            -http: HttpClient
            +getRank() Observable~AdminLotteryInfoRankResponse~
        }
class AdminInfoService{
            -http: HttpClient
            +updateAdminInfo() Observable~UpdateInfoAdminResponse~
        }
class AdminPwdService{
            -http: HttpClient
            +updatePasswordAdmin() Observable~UpdateInfoAdminResponse~
        }
class ParticipantsListService{
            -http: HttpClient
            +removeParticipant() Observable~RemoveParticipantResponse~
+addParticipant() Observable~AddParticipantsResponse~
+populateFakeUser() Observable~PopulateFakeUserResponse~
        }
class TirageListSharedService{
            -http: HttpClient
            +createTirage() Observable~CreateTirageResponse~
+deleteTirage() Observable~DeleteTirageResponse~
        }
class DrawRankService{
            -http: HttpClient
            +getRankTirage() Observable~LotteryInfoRankResponse~
        }
class UserHistoryService{
            -http: HttpClient
            +getHistory() Observable~LotteryHistoryResonse~
        }
class UserUpdateService{
            -http: HttpClient
            +updateInfo() Observable~UpdateInfoUserResponse~
        }
class UserUpdatePasswordService{
            -http: HttpClient
            +updatePassword() Observable~UpdateInfoUserResponse~
        }
class UserPlayServiceService{
            -http: HttpClient
-currentLotteryUpdated: Subject~void~
+currentLotteryUpdated$: Observable~void~
-sharedUserService: UserSharedService
            +getCurentTirage() Observable~LotteryOverviewResponse~
+notifyLotteryUpdate() void
+notifyUserRegistered() void
        }
```
# Test


![uml diagram example](src/image/lotoappfrontend.svg)