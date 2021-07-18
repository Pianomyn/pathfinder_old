import sys
 
class node:
    """
    digits : list
    digit_changed : int
    parent : node
    """
    def __init__(self, digits, digit_changed, parent):
        self.digits = [int(x) for x in str(digits).zfill(3)]
        self.digit_changed = digit_changed
        self.parent = parent
        self.children = []
        self.depth = 0
        self.total_distance = 0
 
    def get_number(self):
        strings = [str(integer) for integer in self.digits]
        string = "".join(strings)
        return int(string)
 
    def get_string(self):
        strings = [str(integer) for integer in self.digits]
        string = "".join(strings)
        return string
 
    def get_all_digits(self):
        return self.digits.copy()
 
    def get_sum(self, n):
        sum = 0
        for i in range(3):
            sum+=abs(self.digits[i]-n.get_digit(i))
        return sum
 
    def get_total_distance(self):
        return self.total_distance
    
    def set_total_distance(self, n):
        self.total_distance = n
 
    
    def get_digit(self, i):
        return self.digits[i]
    
    def get_digit_changed(self):
        return self.digit_changed
    
    def get_parent(self):
        return self.parent
    
    def add_child(self, n):
        self.children.append(n)
 
    def get_children(self):
        return self.children
 
    def equals(self, other_node):
        for i in range(3):
            if self.get_digit(i) != other_node.get_digit(i):
                return False
        if self.get_digit_changed() != other_node.get_digit_changed():
            return False
        return True
    
    def get_depth(self):
        return self.depth
 
    def set_depth(self, n):
        self.depth = n
 
def print_node_parents(n):
    to_print = ""
    while n != None:
        if n.get_children() == []:
            to_print+=str(n.get_string())
        else:
            to_print = str(n.get_string()) + ", " + to_print
        n = n.get_parent()
    print(to_print)
 
def print_node_list(l):
    if len(l) == 0:
        return
 
    to_print=""
    for el in l:
        to_print+=str(el.get_string())+", "
    print(to_print[:len(to_print)-2])
 
 
def bfs(start, goal, forbidden):
    num_expanded = 0
 
    current_node = node(start, -1, None)
    root = current_node
    new_node = None
 
    fringe = []
    expanded = [current_node]
    #Check the start and goal aren't the same
    if goal == start:
        print_node_parents(current_node)
        print_node_list(expanded)
        return
 
    while True:
        #Add all the children of a node to the fringe
        modifiers = [100,10,1]
        for d in range(3):
            if current_node.get_digit_changed() != d:
                if current_node.get_digit(d) != 0:
                    minus_one = node(current_node.get_number()-modifiers[d], d, current_node)
                    fringe.append(minus_one)
                    current_node.add_child(minus_one)
                if current_node.get_digit(d) != 9:
                    plus_one = node(current_node.get_number()+modifiers[d], d, current_node)
                    fringe.append(plus_one)
                    current_node.add_child(plus_one)
 
        #Pop a node from the fringe that hasn't been explored and append that node's children to the fringe
        while True:
            if fringe == []:
                break
            
            new_node = fringe.pop(0)
            found = True
 
            for e in expanded:
                if e.equals(new_node):
                    found = False
                    break
            if new_node.get_string() in forbidden:
                found = False
            if found:
                break
        
        #Check we are not past the limit or there are no nodes to expand
        expanded.append(new_node)
        num_expanded+=1
        if num_expanded == 999 or fringe == []:
            print("no solution found.")
            print_node_list(expanded)
            break
 
        #Check if the newly expanded node is the one we are looking for
        if(new_node.get_number() == goal):
            print_node_parents(new_node)
            print_node_list(expanded)
            break
        else:
            current_node = new_node
 
def dfs(start, goal, forbidden):
    num_expanded = 0
 
    current_node = node(start, -1, None)
    root = current_node
    new_node = None
 
    fringe = []
    expanded = [current_node]
    #Check the start and goal aren't the same
    if goal == start:
        print_node_parents(current_node)
        print_node_list(expanded)
        return
 
    while True:
        #Add all the children of a node to the front of the fringe
        modifiers = [100,10,1]
        for d in range(2, -1, -1):
            if current_node.get_digit_changed() != d:
                if current_node.get_digit(d) != 9:
                    plus_one = node(current_node.get_number()+modifiers[d], d, current_node)
                    fringe.insert(0, plus_one)
                    current_node.add_child(plus_one)
                if current_node.get_digit(d) != 0:
                    minus_one = node(current_node.get_number()-modifiers[d], d, current_node)
                    fringe.insert(0, minus_one)
                    current_node.add_child(minus_one)
        #Pop a node from the fringe that hasn't been explored and append that node's children to the fringe
        while True:
            if fringe == []:
                break
            
            new_node = fringe.pop(0)
            found = True
 
            for e in expanded:
                if e.equals(new_node):
                    found = False
                    break
            if new_node.get_string() in forbidden:
                found = False
            if found:
                break
 
        #Check we are not past the limit or there are no nodes to expand
        expanded.append(new_node)
        num_expanded+=1
        if num_expanded == 999 or fringe == []:
            print("no solution found.")
            print_node_list(expanded)
            break
 
        #Check if the newly expanded node is the one we are looking for
        if(new_node.get_number() == goal):
            print_node_parents(new_node)
            print_node_list(expanded)
            break
        else:
            current_node = new_node
    
"""Similar to BFS but instead add nodes the front of the fringe"""
def ids(start, goal, forbidden):
    num_expanded = 0
    depth_limit = 0
 
    current_node = node(start, -1, None)
    root = current_node
    new_node = None
 
    fringe = []
    current_expanded = []
    total_expanded = []
    #Check the start and goal aren't the same
    if goal == start:
        print_node_parents(current_node)
        print_node_parents(current_node)
        return
 
    while True:                
        #Check if we are past the limit
        num_expanded+=1
        if num_expanded == 1001:
            print("no solution found.")
            print_node_list(total_expanded)
            break
        
        #Check if the current node is the goal
        total_expanded.append(current_node)
        current_expanded.append(current_node)
        if(current_node.get_number() == goal):
            print_node_parents(current_node)
            print_node_list(total_expanded)
            break
        
        #Add all the children of a node to the front of the fringe
        modifiers = [100,10,1]
        for d in range(2, -1, -1):
            if current_node.get_digit_changed() != d and current_node.get_depth() < depth_limit:
 
                if current_node.get_digit(d) != 9:
                    plus_one = node(current_node.get_number()+modifiers[d], d, current_node)
                    plus_one.set_depth(current_node.get_depth()+1)
                    fringe.insert(0, plus_one)
                    current_node.add_child(plus_one)
                if current_node.get_digit(d) != 0:
                    minus_one = node(current_node.get_number()-modifiers[d], d, current_node)
                    minus_one.set_depth(current_node.get_depth()+1)
                    fringe.insert(0, minus_one)
                    current_node.add_child(minus_one)
 
        if fringe == []:
            depth_limit+=1
            current_node = node(start, -1, None)
            root = current_node
            current_expanded = []
 
            new_node = None
            continue
 
        #Pop a node from the fringe that hasn't been explored and append that node's children to the fringe
        while True:
            if fringe == []:
                break
            
            new_node = fringe.pop(0)
            found = True
 
            for e in current_expanded:
                if e.equals(new_node):
                    found = False
                    break
            if new_node.get_string() in forbidden:
                found = False
            if found:
                break
            else:
                new_node = None
        
        #If we popped a value from the fringe, set that to the current node
        if new_node != None:
            current_node = new_node
        else:
            depth_limit+=1
            current_node = node(start, -1, None)
            root = current_node
            current_expanded = []
        
        new_node = None
 
def greedy(start, goal, forbidden):
    num_expanded = 0
 
    current_node = node(start, -1, None)
    goal_node = node(goal, -1, None)
    
    fringe = []
    expanded = []
    while True:
        #Check if past limit, otherwise add to expanded
        num_expanded+=1
        if num_expanded == 1000:
            print("no solution found.")
            print_node_list(expanded)
            break
 
        expanded.append(current_node)
        
        #Check if the current node is the goal node
        if current_node.get_number() == goal:
            print_node_parents(current_node)
            print_node_list(expanded)
            break
 
        #Generate the children of the current node in the fringe
        modifiers = [100,10,1]
        for d in range(3):
            if current_node.get_digit_changed() != d:
                if current_node.get_digit(d) != 0:
                    minus_one = node(current_node.get_number()-modifiers[d], d, current_node)
                    fringe.append(minus_one)
                if current_node.get_digit(d) != 9:
                    plus_one = node(current_node.get_number()+modifiers[d], d, current_node)
                    fringe.append(plus_one)
 
        #If the fringe is empty, then end the algorithm
        if fringe == []:
            print("no solution found.")
            print_node_list(expanded)
            break
        
 
        #Find the best node in the fringe and move to that node. Also remove the best node from the fringe
        best = 28
        best_node = None
        for f in fringe:
            if f.get_sum(goal_node) <= best and f.get_string() not in forbidden:
                best = f.get_sum(goal_node)
                best_node = f
        
        if best_node == None:
            print("no solution found.")
            print_node_list(expanded)
            break
        else:
            fringe.remove(best_node)
        if best_node.get_parent().equals(current_node):
            current_node.add_child(best_node)
        
        current_node = best_node
        
def hill(start, goal, forbidden):
    num_expanded = 0
 
    current_node = node(start, -1, None)
    goal_node = node(goal, -1, None)
    
    fringe = []
    expanded = []
 
    while True:
        #Check if past limit, otherwise add to expanded
        num_expanded+=1
        if num_expanded == 1000:
            print("no solution found.")
            print_node_list(expanded)
            break
 
        expanded.append(current_node)
        
        #Check if the current node is the goal node
        if current_node.get_number() == goal:
            print_node_parents(current_node)
            print_node_list(expanded)
            break
 
        #Generate the children of the current node in the fringe
        modifiers = [100,10,1]
        for d in range(3):
            if current_node.get_digit_changed() != d:
                if current_node.get_digit(d) != 0:
                    minus_one = node(current_node.get_number()-modifiers[d], d, current_node)
                    fringe.append(minus_one)
                if current_node.get_digit(d) != 9:
                    plus_one = node(current_node.get_number()+modifiers[d], d, current_node)
                    fringe.append(plus_one)
 
        #If the fringe is empty, then end the algorithm
        if fringe == []:
            print("no solution found.")
            print_node_list(expanded)
            break
 
        #Find the best node in the fringe and move to that node. Also remove the best node from the fringe
        best = current_node.get_sum(goal_node)
        best_node = current_node
        for f in fringe:
            if f.get_sum(goal_node) <= best and f.get_string() not in forbidden:
                best = f.get_sum(goal_node)
                best_node = f
        
        if best_node == current_node:
            print("no solution found.")
            print_node_list(expanded)
            break
        if best_node.get_parent().equals(current_node):
            current_node.add_child(best_node)
        
        fringe = []
        current_node = best_node
 
def a_star(start, goal, forbidden):
    num_expanded = 0
 
    current_node = node(start, -1, None)
    goal_node = node(goal, -1, None)
    
    fringe = []
    expanded = []
    while True:
        #Check if past limit, otherwise add to expanded
        num_expanded+=1
        if num_expanded == 1000:
            print("no solution found.")
            print_node_list(expanded)
            break
 
        expanded.append(current_node)
        
        #Check if the current node is the goal node
        if current_node.get_number() == goal:
            print_node_parents(current_node)
            print_node_list(expanded)
            break
 
        #Generate the children of the current node in the fringe
        modifiers = [100,10,1]
        for d in range(3):
            if current_node.get_digit_changed() != d:
                if current_node.get_digit(d) != 0:
                    minus_one = node(current_node.get_number()-modifiers[d], d, current_node)
                    minus_one.set_total_distance(current_node.get_total_distance()+ minus_one.get_sum(current_node))
                    fringe.append(minus_one)
                    
                if current_node.get_digit(d) != 9:
                    plus_one = node(current_node.get_number()+modifiers[d], d, current_node)
                    plus_one.set_total_distance(current_node.get_total_distance()+ plus_one.get_sum(current_node))
                    fringe.append(plus_one)
 
 
        #If the fringe is empty, then end the algorithm
        if fringe == []:
            print("no solution found.")
            print_node_list(expanded)
            break
        
 
        #Find the best node in the fringe and move to that node. Also remove the best node from the fringe
        best = sys.maxsize
        best_node = None
        for f in fringe:
            if f.get_sum(goal_node)+f.get_total_distance() <= best and f.get_string() not in forbidden:
                best = f.get_sum(goal_node)+f.get_total_distance()
                best_node = f
        
        if best_node == None:
            print("no solution found.")
            print_node_list(expanded)
            break
        else:
            fringe.remove(best_node)
        if best_node.get_parent().equals(current_node):
            current_node.add_child(best_node)
        
        current_node = best_node
 
 
 
if __name__ == "__main__":
    filename = sys.argv[2]
    input_file = open(filename, 'r')
    lines = input_file.readlines()
 
    start = int(lines[0].strip())
    goal = int(lines[1].strip())
    forbidden = []
    if len(lines)==3:
        forbidden = lines[2].split(',')
 
    if sys.argv[1] == "B":
        bfs(start, goal, forbidden)
    elif sys.argv[1] == "D":
        dfs(start, goal, forbidden)
    elif sys.argv[1] == "I":
        ids(start, goal, forbidden)
    elif sys.argv[1] == "G":
        greedy(start, goal, forbidden)
    elif sys.argv[1] == "H":
        hill(start, goal, forbidden)
    elif sys.argv[1] == "A":
        a_star(start, goal, forbidden)
    else:
        print("Please enter an algorithm")